import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import KioskTimeSlotDto from './kioskTimeslot.dto';

class KioskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  dimensions: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ValidateNested({ each: true })
  @Type(() => KioskTimeSlotDto)
  timeslots: KioskTimeSlotDto[];
}

export default KioskDto;
