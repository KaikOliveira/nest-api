import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimeOptionsService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return this.prisma.timeOption.findMany();
  }

  async create({ day, time }: { day: number; time: Date }) {
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

  async update(id: number, data) {
    id = Number(id);
    if (isNaN(id)) throw new BadRequestException('ID is required');

    if (!data.day) throw new BadRequestException('Day is required');

    if (!data.time) throw new BadRequestException('Time is required');

    data.day = Number(data.day);
    data.time = new Date(data.time);

    return await this.prisma.timeOption.update({
      data: {
        day: data.day,
        time: data.time,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    id = Number(id);
    if (isNaN(id)) throw new BadRequestException('ID is required');

    return await this.prisma.timeOption.delete({
      where: {
        id,
      },
    });
  }
}
