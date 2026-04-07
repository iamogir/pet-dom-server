import { Body, Controller, Post } from '@nestjs/common';
import { PetService } from '../service/pet.service';
import { CreatePetDto } from '../dto/create-pet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() dto: CreatePetDto) {
    return this.petService.create(dto);
  }
}
