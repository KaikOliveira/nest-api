import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDTO } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAddressDTO) {
    const {
      street,
      district,
      number,
      complement,
      city,
      state,
      country,
      zipCode,
      personId,
    } = data;

    const { id } = await this.prisma.user.findUnique({
      where: {
        id: +personId,
      },
    });

    if (!id) {
      throw new BadRequestException('User not found.');
    }

    return this.prisma.addresses.create({
      data: {
        personId: +id,
        street,
        number,
        complement,
        district,
        city,
        state,
        country,
        zipCode: zipCode.replace('-', ''),
      },
    });
  }

  async getAll() {
    return `This action returns all addresses`;
  }

  async get(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  async remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
