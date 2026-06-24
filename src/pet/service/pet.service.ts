import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { PetResponseDto } from '../dto/pet-response.dto';
import { UsersArrayResponseDto } from '../../user/dto/users-array-response.dto';
import { toPetResponseArrayDto } from '../lib/pet.mapper';
import { EditPetDto } from '../dto/edit-pet.dto';
import { SchemaPetDto } from '../dto/schema-pet.dto';
import { StorageService } from '../../storage/storage.service';
import { PetCreateResponseDto } from '../dto/pet-create-response.dto';
import { AiService } from '../../ai/service/ai.service';
import { AiAdviceDto } from '../../ai/dto/ai-advice.dto';

@Injectable()
export class PetService {
  constructor(
    private prisma: PrismaService,
    private readonly storageService: StorageService,
    private readonly aiService: AiService,
  ) {}

  async addPet(
    dto: CreatePetDto,
    userId: string,
    file: Express.Multer.File | undefined,
  ) {
    let photoUrl: string | undefined;

    if (file) {
      photoUrl = await this.storageService.uploadImage(file);
    }

    const newPet = await this.prisma.pet.create({
      data: {
        name: dto.name,
        species: dto.species,
        ...(dto.breed && { breed: dto.breed }),
        ...(photoUrl && { photoUrl }),
        // photoUrl: photoUrl,
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
        photoUrl: true,
      },
    });

    return new PetCreateResponseDto(newPet);
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

  async editPetById(id: string, dto: EditPetDto) {
    const updatedPet = new SchemaPetDto(dto);
    const pet = await this.prisma.pet.update({
      where: { id },
      data: updatedPet,
    });
    if (!pet) throw new Error('Pet not found');
    return new PetResponseDto(pet);
  }

  async uploadPhoto(id: string, file: Express.Multer.File) {
    const photoUrl = await this.storageService.uploadImage(file);

    console.log('UPLOAD ID:', id);
    console.log('FILE:', file?.originalname);

    const pet = await this.prisma.pet.update({
      where: { id },
      data: { photoUrl },
    });
    if (!pet) throw new Error('Pet not found');
    return new PetResponseDto(pet);
  }

  async deletePetById(id: string) {
    const pet = await this.prisma.pet.delete({
      where: { id },
    });
    if (!pet) throw new Error('Pet not found');

    return new PetResponseDto(pet);
  }

  async getAiAdvice(id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
    });
    if (!pet) throw new Error('Pet not found');

    const prompt = `
    You are a pet care assistant.
    Analyze this pet profile and give 3 short, safe, general care recommendations.
    
    Pet data:
    Name: ${pet.name}
    Species: ${pet.species}
    Breed: ${pet.breed ?? 'unknown'}
    Photo URL: ${pet.photoUrl ?? 'not provided'}
    
    Rules:
    - Do not diagnose diseases.
    - Do not prescribe medication.
    - If something looks risky, recommend contacting a veterinarian.
    - Answer in English.
    `;

    return new AiAdviceDto(await this.aiService.generatePetAdvice(prompt));
  }
}
