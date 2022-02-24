import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
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
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.addressesService.get(+id);
  }

  @Post()
  async create(@Body() createAddressDTO: CreateAddressDTO) {
    return this.addressesService.create(createAddressDTO);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAddressDto,
  ) {
    return this.addressesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressesService.remove(+id);
  }
}
