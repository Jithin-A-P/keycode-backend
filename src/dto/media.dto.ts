import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MediaType } from '../enums/mediaType';

class MediaDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(MediaType)
  type: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}

export default MediaDto;
