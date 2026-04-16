import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dto/user-response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PetResponseDto } from '../../pet/dto/pet-response.dto';

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

    return this.toPetResponseArray(pets);
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
    return this.toPetResponseArray(pets);
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('smth goes wrong');
    return new UserResponseDto(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.phone,
      user.country,
      user.gender,
      String(user.birthDate),
      user.avatarUrl,
    );
  }

  private toPetResponseArray(pets: any[]) {
    const newPets: PetResponseDto[] = [];
    pets.map((pet) => newPets.push(new PetResponseDto(pet)));
    return newPets;
  }
}
