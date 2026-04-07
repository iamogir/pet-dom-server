import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePetDto) {
    return this.prisma.pet.create({
      data: {
        name: dto.name,
        species: dto.species,
        breed: dto.breed,
        birthDate: dto.birthDate,
        weight: dto.weight,
        sex: dto.sex,
        photoUrl: dto.photoUrl,
        createdAt: Date.now(),
        petOwners: {
          create: {
            userId: dto.userId,
            role: 'owner',
          },
        },
      },
    });
  }
}
