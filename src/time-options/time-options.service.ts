import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimeOptionsService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return `This action returns all addresses`;
  }

  async create(data) {
    return 'This action adds a new address';
  }

  async get(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(id: number, data) {
    return `This action updates a #${id} address`;
  }

  async delete(id: number) {
    return `This action removes a #${id} address`;
  }
}
