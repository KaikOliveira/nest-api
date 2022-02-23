import {
  IsDateString,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class UpdateTimeOptionDTO {
  @IsNumber()
  id: number;

  @IsNumberString()
  @IsOptional()
  day?: number;

  @IsDateString()
  @IsOptional()
  time?: Date;
}
