import { IsNotEmpty, IsNumber } from 'class-validator';

class KioskTimeSlotDto {
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsNumber()
  pricePerSecond: number;

  @IsNotEmpty()
  @IsNumber()
  avgViewCount: number;

  @IsNotEmpty()
  @IsNumber()
  liveViewCount: number;
}

export default KioskTimeSlotDto;
