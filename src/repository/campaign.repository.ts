import { DeepPartial, Repository } from 'typeorm';
import Campaign from '../entity/campaign.entity'; // Import your Campaign entity

class CampaignRepository {
  constructor(private campaignRepository: Repository<Campaign>) {}

  public findAll = (skip: number, take: number): Promise<[Campaign[], number]> => {
    return this.campaignRepository.findAndCount({
      skip: skip,
      take: take,
    });
  }

  public findById = (id: string): Promise<Campaign> => {
    return this.campaignRepository.findOne({
      where: { id: Number(id) },
    });
  }

  // Customize additional find methods as needed

  public remove = (campaign: Campaign): Promise<Campaign> => {
    return this.campaignRepository.softRemove(campaign);
  }

  public add = (campaign: DeepPartial<Campaign>): Promise<Campaign> => {
    return this.campaignRepository.save(campaign);
  }

  public update = (campaign: DeepPartial<Campaign>): Promise<Campaign> => {
    return this.campaignRepository.save(campaign);
  }
}

export default CampaignRepository;
