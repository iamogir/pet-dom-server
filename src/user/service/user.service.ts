import { Injectable } from '@nestjs/common';
import { MeResponseDto } from '../dto/me-response.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(id: string): Promise<MeResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('smth goes wrong');
    return new MeResponseDto(user.id, user.email, user.name);
  }
}
