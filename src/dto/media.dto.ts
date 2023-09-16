import { IsEnum, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { MediaType } from '../enums/mediaType';

class MediaDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(MediaType)
  type: string;

  @IsOptional()
  @IsString()
  url: string;


  @IsOptional()
  @IsBoolean()
  instant: boolean;
}

export default MediaDto;
