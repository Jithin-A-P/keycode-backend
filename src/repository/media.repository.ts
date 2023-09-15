import { DeepPartial, Repository } from 'typeorm';
import Media from '../entity/media.entity';

class MediaRepository {
  constructor(private mediaRepository: Repository<Media>) {}

  public findAll = (skip: number, take: number): Promise<[Media[], number]> => {
    return this.mediaRepository.findAndCount({
      skip: skip,
      take: take,
    });
  }

  public findById = (id: string): Promise<Media> => {
    return this.mediaRepository.findOne({
      where: { id: id },
    });
  }

  // Customize additional find methods as needed

  public remove = (media: Media): Promise<Media> => {
    return this.mediaRepository.softRemove(media);
  }

  public add = (media: DeepPartial<Media>): Promise<Media> => {
    return this.mediaRepository.save(media);
  }

  public update = (media: DeepPartial<Media>): Promise<Media> => {
    return this.mediaRepository.save(media);
  }
}

export default MediaRepository;
