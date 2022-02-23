import {
  IsNumberString,
  IsPostalCode,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateAddressDTO {
  @IsNumberString()
  @IsNotEmpty()
  personId: number;

  @IsString()
  @IsOptional()
  number?: string;
  complement?: string;

  @IsString()
  @IsNotEmpty()
  street: string;
  district: string;
  city: string;
  state: string;
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('BR')
  zipCode: string;
}
