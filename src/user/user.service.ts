import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(id: number) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('ID is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        person: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
