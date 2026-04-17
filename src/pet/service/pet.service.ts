import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { PetResponseDto } from '../dto/pet-response.dto';
import { UsersArrayResponseDto } from '../../user/dto/users-array-response.dto';
import { PetsArrayResponseDto } from '../dto/pets-array-response.dto';
import { toPetResponseArrayDto } from '../lib/pet.mapper';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async addPet(dto: CreatePetDto, userId: string) {
    const bDay = new Date(dto.birthDate);
    const newPet = await this.prisma.pet.create({
      data: {
        name: dto.name,
        species: dto.species,
        breed: dto.breed,
        birthDate: bDay,
        weight: Number(dto.weight),
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
        photoUrl: true,
      },
    });
    return new PetResponseDto(newPet);
  }

  async getPetById(id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: id },
    });
    if (!pet) throw new Error('Pet not found');
    return new PetResponseDto(pet);
  }

  async getAllUsersByPet(id: string) {
    const users = await this.prisma.user.findMany({
      where: {
        petOwners: {
          some: {
            petId: id,
          },
        },
      },
    });
    if (users.length === 0) throw new Error('No users found');
    return new UsersArrayResponseDto(users);
  }

  async getAllPets() {
    const pets = await this.prisma.pet.findMany();
    if (pets.length === 0) throw new Error('No pets');
    return toPetResponseArrayDto(pets);
  }
}
