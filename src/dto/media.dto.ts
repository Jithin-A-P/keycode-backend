import { IsNotEmpty, IsString } from 'class-validator';

class MediaDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}

export default MediaDto;
