import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePetDto } from '../dto/create-pet.dto';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  addPet(dto: CreatePetDto, userId: string) {
    return this.prisma.pet.create({
      data: {
        name: dto.name,
        species: dto.species,
        breed: dto.breed,
        birthDate: dto.birthDate,
        weight: dto.weight,
        sex: dto.sex,
        // createdAt: new Date().toString(),
        petOwners: {
          create: {
            userId: userId,
            ownerRole: 'owner',
          },
        },
      },
    });
  }

  getAllPetsByUser(userId: string) {
    return this.prisma.pet.findMany({
      where: {
        petOwners: {
          some: {
            userId: userId,
          },
        },
      },
    });
  }
}
