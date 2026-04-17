import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dto/user-response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { toPetResponseArrayDto } from '../../pet/lib/pet.mapper';
import { toUserResponseArrayDto } from '../lib/user.mapper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(id: string): Promise<UserResponseDto> {
    return await this.getUserById(id);
  }

  async getMyPets(id: string) {
    const pets = await this.prisma.pet.findMany({
      where: {
        petOwners: {
          some: {
            userId: id,
          },
        },
      },
    });
    if (pets.length === 0) throw new Error('pets not found');

    return toPetResponseArrayDto(pets);
  }

  async getAllPetsByUser(id: string) {
    const pets = await this.prisma.pet.findMany({
      where: {
        petOwners: {
          some: {
            userId: id,
          },
        },
      },
    });
    if (pets.length === 0) throw new Error('pets not found');
    return toPetResponseArrayDto(pets);
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('smth goes wrong');
    return new UserResponseDto(user);
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    if (users.length === 0) throw new Error('users not found');

    return toUserResponseArrayDto(users);
  }
}
