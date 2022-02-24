import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAddressDTO) {
    data.personId = +data.personId;
    data.zipCode = data.zipCode.replace('-', '');

    const user = await this.prisma.user.findUnique({
      where: {
        id: +data.personId,
      },
    });

    if (!user) throw new BadRequestException('User not found.');

    return this.prisma.addresses.create({
      data: data,
    });
  }

  async getAll() {
    return this.prisma.addresses.findMany();
  }

  async get(id: number) {
    const address = await this.prisma.addresses.findUnique({
      where: {
        id,
      },
    });

    if (!address) {
      throw new BadRequestException('Address not found.');
    }

    return address;
  }

  async update(id: number, data: UpdateAddressDto) {
    if (data.zipCode) data.zipCode = data.zipCode.replace('-', '');

    await this.get(+id);

    return this.prisma.addresses.update({
      data: data,
      where: {
        id: +id,
      },
    });
  }

  async remove(id: number) {
    await this.get(+id);

    await this.prisma.addresses.delete({
      where: {
        id,
      },
    });
  }
}
