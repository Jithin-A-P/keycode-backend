import { DeepPartial, In, Repository } from 'typeorm';
import KioskTimeSlot from '../entity/kioskTimeslot.entity'; // Import your Kiosk entity

class KioskTimeSlotRepository {
  constructor(private kioskRepository: Repository<KioskTimeSlot>) {}

  public findByIds = (ids:number[]): Promise<KioskTimeSlot[]> => {
    return this.kioskRepository.findBy({id:In(ids)});
  }
}
export default KioskTimeSlotRepository;