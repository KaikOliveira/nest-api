import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  async create(@Body() data) {
    return this.timeOptionsService.create(data);
  }

  @Get(':id')
  async update(@Param('id') id: number, @Body() data) {
    return this.timeOptionsService.update(id, data);
  }

  @Get(':id')
  async delete(@Param('id') id: number) {
    return this.timeOptionsService.delete(id);
  }
}
