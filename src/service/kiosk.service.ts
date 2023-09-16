import Kiosk from '../entity/kiosk.entity'; // Import your Kiosk entity
import KioskRepository from '../repository/kiosk.repository'; // Import your Kiosk repository
import NotFoundException from '../exception/not-found.exception';
import KioskDto from '../dto/kiosk.dto';
import { ObjectLiteral } from 'typeorm';
import KioskTimeSlot from '../entity/kioskTimeslot.entity';
import KioskTimeSlotRepository from '../repository/kiosk.timeslot.repository';




class KioskService {
  constructor(private kioskRepository: KioskRepository, private kioskTimeslotRepository: KioskTimeSlotRepository) {}

  public getAllKiosks = (
    rowsPerPage: number,
    pageNumber: number
  ): Promise<[Kiosk[], number]> => {
    const defaultRowsPerPage = 15;
    const take = rowsPerPage || defaultRowsPerPage;

    const rowsToSkip = (pageNumber - 1) * take;
    const skip = rowsToSkip > 0 ? rowsToSkip : 0;
    
    return this.kioskRepository.findAll(skip, take);
  }

  public getKioskById = async (id: string): Promise<Kiosk> => {
    const kiosk = await this.kioskRepository.findById(id);
    kiosk.timeslots.sort((a, b) => (a.time < b.time ? -1 : 1));
    if (!kiosk) {
      throw new NotFoundException(`Kiosk not found with id: ${id}`);
    }
    
    return kiosk;
  }

  public getKioskSlotByKioskId = async (obj: ObjectLiteral): Promise<KioskTimeSlot> => {
    const kioskTimeSlot = await this.kioskTimeslotRepository.findSlot(obj);
    return kioskTimeSlot;
  }

  public removeKioskById = async (id: string): Promise<void> => {
    const kiosk = await this.kioskRepository.findById(id);
    if (!kiosk) {
      throw new NotFoundException(`Kiosk not found with id: ${id}`);
    }
    
    await this.kioskRepository.remove(kiosk);
  }

  public addKiosk = async (kioskDto: KioskDto): Promise<Kiosk> => {
    const newKiosk = await this.kioskRepository.add(kioskDto);

    return newKiosk;
  }

  public updateKiosk = async (
    id: string,
    kioskDto: KioskDto
  ): Promise<Kiosk> => {
    const kiosk = await this.getKioskById(id);

    const updatedKiosk = await this.kioskRepository.update({
      ...kiosk,
      ...kioskDto
    });

    return updatedKiosk;
  }

  public updateKioskTimeSlot = async (message: ObjectLiteral): Promise<KioskTimeSlot> => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const kioskSlotObj = {
      time: currentHour,
      kioskId: message['kioskId'],
    }
    const additionalInfo = {
      pricePerSecond: 50,
      avgViewCount: 40,
      liveViewCount: message['personCount']
    };
    const kioskTimeSlot = await this.getKioskSlotByKioskId(kioskSlotObj);
    if (!kioskTimeSlot) {
      return await this.kioskTimeslotRepository.addTimeSlot({ ...kioskSlotObj, ...additionalInfo })
    }
    const updatedKioskSlot = await this.kioskTimeslotRepository.updateTimeSlot({
      ...kioskTimeSlot,
      liveViewCount: message['personCount']
    });

    return updatedKioskSlot;
  }
}

export default KioskService;
