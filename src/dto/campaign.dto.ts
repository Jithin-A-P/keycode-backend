import { IsDate, IsNotEmpty, IsString, IsArray, ValidateNested, IsObject, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import MediaDto from './media.dto';
import KioskTimeSlot from '../entity/kioskTimeslot.entity';


class CampaignDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  mediaId: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  frequency: number;
  
  timeSlotsIds: number[];
  timeSlots:KioskTimeSlot[]
}

export default CampaignDto  ;
