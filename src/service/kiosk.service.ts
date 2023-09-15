import Kiosk from '../entity/kiosk.entity'; // Import your Kiosk entity
import KioskRepository from '../repository/kiosk.repository'; // Import your Kiosk repository
import NotFoundException from '../exception/not-found.exception';
import KioskDto from '../dto/kiosk.dto';

class KioskService {
  constructor(private kioskRepository: KioskRepository) {}

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
    if (!kiosk) {
      throw new NotFoundException(`Kiosk not found with id: ${id}`);
    }
    
    return kiosk;
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
}

export default KioskService;
