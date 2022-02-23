import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTimeOptionDTO } from './dto/create-time-options.dto';
import { UpdateTimeOptionDTO } from './dto/update-time-options.dto';

@Injectable()
export class TimeOptionsService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return this.prisma.timeOption.findMany();
  }

  async create(data: CreateTimeOptionDTO) {
    let { day, time } = data;
    if (!day) throw new BadRequestException('Day is required');

    if (!time) throw new BadRequestException('Time is required');

    day = Number(day);
    time = new Date(time);

    return await this.prisma.timeOption.create({
      data: {
        day,
        time,
      },
    });
  }

  async get(id: number) {
    id = Number(id);
    if (isNaN(id)) throw new BadRequestException('ID is required');

    const timeOption = await this.prisma.timeOption.findUnique({
      where: {
        id,
      },
    });

    if (!timeOption) throw new NotFoundException('Time not found');
    return timeOption;
  }

  async update(data: UpdateTimeOptionDTO) {
    let { id } = data;

    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id must be a number');
    }

    const dataTimeOptions = {} as Prisma.TimeOptionUpdateInput;

    if (data.day) {
      data.day = Number(data.day);
      dataTimeOptions.day = data.day;
    }

    if (data.time) {
      data.time = new Date(data.time);
      dataTimeOptions.day = data.day;
    }

    return await this.prisma.timeOption.update({
      data: dataTimeOptions,
      where: {
        id: data.id,
      },
    });
  }

  async delete(id: number) {
    id = Number(id);
    if (isNaN(id)) throw new BadRequestException('ID is required');

    const timeOption = await this.get(id);

    if (!timeOption) throw new NotFoundException('Not found time option');

    return await this.prisma.timeOption.delete({
      where: {
        id,
      },
    });
  }
}
