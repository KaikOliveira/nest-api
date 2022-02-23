import { IsDateString, IsNumberString } from 'class-validator';

export class CreateTimeOptionDTO {
  @IsNumberString()
  day: number;

  @IsDateString()
  time: Date;
}
