import { IsEnum, IsString, IsOptional, ValidateNested, ValidateIf, IsNotEmpty } from 'class-validator';
import MediaDto from '../dto/media.dto';
import { Type } from 'class-transformer';

export enum KioskQMediaType {
  AD = "ad",
  INSTANT_MEDIA = "instant_media",
  GAME = "game",
  ADVERTISE_HERE = "advertise_here",
}

export class KioskQMedia {
  id: number;

  @IsEnum(KioskQMediaType)
  type: KioskQMediaType;

  @IsString()
  qrcodeUrl: string;

  @ValidateIf(input => input.type === KioskQMediaType.GAME)
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ValidateIf(input => input.type === KioskQMediaType.AD)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MediaDto)
  media?: MediaDto;
}
