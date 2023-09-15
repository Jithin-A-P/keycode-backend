import Media from '../entity/media.entity';
import MediaRepository from '../repository/media.repository';
import NotFoundException from '../exception/not-found.exception';
import MediaDto from '../dto/media.dto';

class MediaService {
  constructor(private mediaRepository: MediaRepository) {}

  public getAllMedia = (
    rowsPerPage: number,
    pageNumber: number
  ): Promise<[Media[], number]> => {
    const defaultRowsPerPage = 15;
    const take = rowsPerPage || defaultRowsPerPage;

    const rowsToSkip = (pageNumber - 1) * take;
    const skip = rowsToSkip > 0 ? rowsToSkip : 0;

    return this.mediaRepository.findAll(skip, take);
  }

  public getMediaById = async (id: string): Promise<Media> => {
    const media = await this.mediaRepository.findById(id);
    if (!media) {
      throw new NotFoundException(`Media not found with id: ${id}`);
    }

    return media;
  }

  public removeMediaById = async (id: string): Promise<void> => {
    const media = await this.mediaRepository.findById(id);
    if (!media) {
      throw new NotFoundException(`Media not found with id: ${id}`);
    }

    await this.mediaRepository.remove(media);
  }

  public addMedia = async (mediaDto: MediaDto): Promise<Media> => {
    const newMedia = await this.mediaRepository.add(mediaDto);

    return newMedia;
  }

  public updateMedia = async (
    id: string,
    mediaDto: MediaDto
  ): Promise<Media> => {
    const media = await this.getMediaById(id);

    const updatedMedia = await this.mediaRepository.update({
      ...media,
      ...mediaDto,
    });

    return updatedMedia;
  }
}

export default MediaService;
