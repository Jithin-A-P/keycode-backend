import { DeepPartial, In, ObjectLiteral, Repository } from 'typeorm';
import KioskTimeSlot from '../entity/kioskTimeslot.entity'; // Import your Kiosk entity

class KioskTimeSlotRepository {
  constructor(private kioskRepository: Repository<KioskTimeSlot>) {}

  public findByIds = (ids:number[]): Promise<KioskTimeSlot[]> => {
    return this.kioskRepository.findBy({id:In(ids)});
  }

  public findSlot = (obj: ObjectLiteral): Promise<KioskTimeSlot> => {
    return this.kioskRepository.findOne({
      where: obj
    });
  }

  public addTimeSlot = (kioskSlot: DeepPartial<KioskTimeSlot>): Promise<KioskTimeSlot> => {
    return this.kioskRepository.save(kioskSlot);
  }


  public updateTimeSlot = (kioskTimeSlot: DeepPartial<KioskTimeSlot>): Promise<KioskTimeSlot> => {
    return this.kioskRepository.save(kioskTimeSlot);
  }
}
export default KioskTimeSlotRepository;