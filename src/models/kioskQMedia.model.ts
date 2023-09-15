import { IsEnum, IsString, IsOptional, ValidateNested, ValidateIf, IsNotEmpty } from "class-validator";
import MediaDto from "../dto/media.dto";
import { Type } from "class-transformer";

export enum KioskQMediaType {
  AD = "ad",
  INSTANT_MEDIA = "instant_media",
  GAME_ONE_PLAYER = "game_one_player",
  GAME_TWO_PLAYERS = "game_two_players",
  ADVERTISE_HERE = "advertise_here",
  YOUTUBE ="youtube"
}

export class KioskQMedia {
  id?: number;

  @IsEnum(KioskQMediaType)
  type: KioskQMediaType;

  @IsString()
  qrcodeUrl: string;

  @ValidateIf(
    (input) => input.type === KioskQMediaType.GAME_ONE_PLAYER || input.type === KioskQMediaType.GAME_TWO_PLAYERS
  )
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ValidateIf(input =>( input.type === KioskQMediaType.AD || input.type === KioskQMediaType.YOUTUBE))
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MediaDto)
  media?: MediaDto;

  status: string;
}
