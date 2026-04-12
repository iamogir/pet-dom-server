import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { PetResponseDto } from '../dto/pet-response.dto';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async addPet(dto: CreatePetDto, userId: string) {
    const newPet = await this.prisma.pet.create({
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
      select: {
        id: true,
        name: true,
        species: true,
        breed: true,
        birthDate: true,
        weight: true,
        sex: true,
      },
    });
    return new PetResponseDto(
      newPet.id,
      newPet.name,
      newPet.species,
      newPet.breed,
      newPet.birthDate,
      newPet.weight,
      newPet.sex,
    );
  }

  async getPetById(id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: id },
    });
    if (!pet) throw new Error('Pet not found');
    return this.createDtoObject(pet);
  }

  async getAllUsersByPet(id: string) {
    const users = await this.prisma.pet.findMany({
      where: {
        petOwners: {
          some: {
            petId: id,
          },
        },
      },
    });
    if (users.length === 0) throw new Error('No users found');
    return new PetUsersResponseDto(users);
  }

  private createDtoObject(pet: PetResponseDto) {
    return new PetResponseDto(
      pet.id,
      pet.name,
      pet.species,
      pet.breed,
      pet.birthDate,
      pet.weight,
      pet.sex,
    );
  }
}
