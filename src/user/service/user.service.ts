import { Injectable } from '@nestjs/common';
import { MeResponseDto } from '../dto/me-response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { MyPetsResponseDto } from '../dto/myPets-response.dto';
import { PetResponseDto } from '../../pet/dto/pet-response.dto';

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

  async getMyPets(id: string) {
    const pets: PetResponseDto[] = await this.prisma.pet.findMany({
      where: {
        petOwners: {
          some: {
            userId: id,
          },
        },
      },
    });
    if (pets.length === 0) throw new Error('pets not found');
    return new MyPetsResponseDto(pets);
  }
}
