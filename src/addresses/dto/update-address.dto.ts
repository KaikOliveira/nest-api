import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAddressDTO } from './create-address.dto';

export class UpdateAddressDto extends PartialType(
  OmitType(CreateAddressDTO, [] as const),
) {}
