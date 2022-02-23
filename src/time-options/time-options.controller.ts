import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTimeOptionDTO } from './dto/create-time-options.dto';

import { TimeOptionsService } from './time-options.service';

@Controller('time-options')
export class TimeOptionsController {
  constructor(private timeOptionsService: TimeOptionsService) {}

  @Get()
  async getAll() {
    return this.timeOptionsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.timeOptionsService.get(id);
  }

  @Post()
  async create(@Body() data: CreateTimeOptionDTO) {
    return this.timeOptionsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data) {
    const { time, day } = data;
    const dataTimeOption = {
      id,
      day,
      time,
    };
    return this.timeOptionsService.update(dataTimeOption);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.timeOptionsService.delete(id);
  }
}
