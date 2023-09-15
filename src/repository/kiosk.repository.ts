import { DeepPartial, Repository } from 'typeorm';
import Kiosk from '../entity/kiosk.entity'; // Import your Kiosk entity

class KioskRepository {
  constructor(private kioskRepository: Repository<Kiosk>) {}

  public findAll = (skip: number, take: number): Promise<[Kiosk[], number]> => {
    return this.kioskRepository.findAndCount({
      skip: skip,
      take: take,
    });
  }

  public findById = (id: string): Promise<Kiosk> => {
    return this.kioskRepository.findOne({
      where: { id: Number(id) },
    });
  }

  // Customize additional find methods as needed

  public remove = (kiosk: Kiosk): Promise<Kiosk> => {
    return this.kioskRepository.softRemove(kiosk);
  }

  public add = (kiosk: DeepPartial<Kiosk>): Promise<Kiosk> => {
    return this.kioskRepository.save(kiosk);
  }

  public update = (kiosk: DeepPartial<Kiosk>): Promise<Kiosk> => {
    return this.kioskRepository.save(kiosk);
  }
}

export default KioskRepository;
