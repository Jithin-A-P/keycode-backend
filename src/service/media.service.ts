import Media from '../entity/media.entity';
import MediaRepository from '../repository/media.repository';
import NotFoundException from '../exception/not-found.exception';
import MediaDto from '../dto/media.dto';
import { MediaType } from '../enums/mediaType';
import axios from 'axios';
import HttpException from '../exception/http.exception';
import * as dotenv from 'dotenv'
import KioskQService from './kioskQueue.service';
import { KioskQMediaType } from '../models/kioskQMedia.model';
dotenv.config({ path: __dirname + '/../.env' })

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

  public addMedia = async (mediaDto: MediaDto): Promise<any> => {
    let type = undefined
    let media = undefined
    if (mediaDto.type === MediaType.ANNOUNCEMENT) {
      media= {}
      const result = await axios.post(
        `https://api.openai.com/v1/moderations`,
        { input: mediaDto.title },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
        },
      );
      const categories = result.data.results[0].categories;
      const keysWithTrueValues: string[] = [];
      for (const key in categories) {
        if (categories.hasOwnProperty(key) && categories[key] === true) {
        keysWithTrueValues.push(key);
      }
}
      if (result.data.results[0].flagged) {
        throw new HttpException(400, `The uploaded media content has been flagged due to ${keysWithTrueValues.join(', ')}`);
      }
    }
    
    if (mediaDto.instant === true) {
      const type = KioskQMediaType.AD;
      media = media === undefined? mediaDto:null;
      const data ={qrcodeUrl:'hello',type,media:mediaDto,status:"ACTIVE"};
    const out =KioskQService.addToKioskQFront('1',data)
    return mediaDto;
    }else {
      const newMedia = await this.mediaRepository.add(mediaDto);
      return newMedia;
    }
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
