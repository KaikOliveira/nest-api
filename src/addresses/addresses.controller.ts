import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async getAll() {
    return this.addressesService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.addressesService.get(+id);
  }

  @Post()
  async create(@Body() createAddressDTO: CreateAddressDTO) {
    return this.addressesService.create(createAddressDTO);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
