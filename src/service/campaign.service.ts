import Campaign from '../entity/campaign.entity'; // Import your campaign entity
import NotFoundException from '../exception/not-found.exception';
import CampaignRepository from '../repository/campaign.repository';
import CampaignDto from '../dto/campaign.dto';
import KioskTimeSlotRepository from '../repository/kiosk.timeslot.repository';
import KioskTimeSlot from '../entity/kioskTimeslot.entity';
import KioskRepository from '../repository/kiosk.repository';
import KioskQService  from './kioskQueue.service';
import { KioskQMediaType } from '../models/kioskQMedia.model';

class CamapignService {
  constructor(private campaignRepository: CampaignRepository,
    private kioskTimeslotRepository: KioskTimeSlotRepository,
    private kioskRepository: KioskRepository ,
    ) {}

  public getAllCampaigns = (
    rowsPerPage: number,
    pageNumber: number
  ): Promise<[Campaign[], number]> => {
    const defaultRowsPerPage = 15;
    const take = rowsPerPage || defaultRowsPerPage;

    const rowsToSkip = (pageNumber - 1) * take;
    const skip = rowsToSkip > 0 ? rowsToSkip : 0;
    
    return this.campaignRepository.findAll(skip, take);
  }

  public getCampaignById = async (id: string): Promise<any> => {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign not found with id: ${id}`);
    }
    const campaignCopy = {...campaign};

    const media = await campaign.media;
    const timeSlots =await campaign.timeSlots;
    const groupedData =timeSlots.reduce((result, item) => {
      const keyValue = item['kioskId'];
  
      // If the key doesn't exist in the result, create an empty array for it
      if (!result[keyValue]) {
        result[keyValue] = [];
      }
  
      // Push the item to the corresponding key in the result
      result[keyValue].push(item);
      return result;
    }, {});
    const out =[]
    for (const key in groupedData) {
      const kisokTimeSlots =groupedData[key]
      const kiosk = await this.kioskRepository.findById(kisokTimeSlots[0].kioskId)
      out.push({"kiosk":kiosk,"selectedTimeslots":kisokTimeSlots})
    }
    
    return {"campaign":campaignCopy,media,"kioskDetails":out};
  }

  public removeCampaignById = async (id: string): Promise<void> => {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign not found with id: ${id}`);
    }
    
    await this.campaignRepository.remove(campaign);
  }

  public addCampaign = async (campaignDto: CampaignDto): Promise<Campaign> => {
    const {  timeSlotsIds,...rest } = campaignDto;
    const kiosktimeSlots = await this.kioskTimeslotRepository.findByIds(timeSlotsIds);
    rest.timeSlots= kiosktimeSlots;
    const campaign = Object.assign(new Campaign(), rest);
    await this.campaignRepository.add(campaign);
    const type=KioskQMediaType.AD;
    const media ={... campaign.media,instant:false};
    delete media['campaigns'];
    const data ={media,type,status:'ACTIVE',qrcodeUrl:'hello'}
    KioskQService.addToKioskQFront('1',data)
    KioskQService.addToKioskQAtPos(3,'1',data)

    return campaign;
  }

  public updateCampaign = async (
    id: string,
    campaignDto: CampaignDto
  ): Promise<Campaign> => {
    const  campaign= await this.getCampaignById(id);

    const updatedCamapign = await this.campaignRepository.update({
      ...campaign,
      ...campaignDto
    });

    return updatedCamapign;
  }
}

export default CamapignService;
