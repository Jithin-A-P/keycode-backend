import { IsDate, IsNotEmpty, IsString, IsArray, ValidateNested, IsObject, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import MediaDto from './media.dto';


class CampaignDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  mediaId: Number

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  frequency: number;
  
  @ValidateNested({ each: true })
  @Type(() => Number)
  timeslotsIds: number[];
}

export default CampaignDto  ;
