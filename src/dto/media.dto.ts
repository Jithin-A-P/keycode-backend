import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MediaType } from '../enums/mediaType';

class MediaDto {
  @IsOptional()
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
