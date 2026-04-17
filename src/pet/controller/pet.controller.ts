import {
  Body,
  Controller,
  Get,
  Param, Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PetService } from '../service/pet.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { EditPetDto } from '../dto/edit-pet.dto';

// @UseGuards(JwtAuthGuard)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addPet(
    @Body() dto: CreatePetDto,
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.petService.addPet(dto, req.user.id);
  }

  @Get('/:id')
  getPetById(@Param('id') id: string) {
    return this.petService.getPetById(id);
  }

  @Get('/:id/users')
  getAllUsersByPet(@Param('id') id: string) {
    return this.petService.getAllUsersByPet(id);
  }

  @Get()
  getAllPets() {
    return this.petService.getAllPets();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  editPetById(@Param('id') id: string, @Body() dto: EditPetDto) {
    return this.petService.editPetById(id, dto);
  }
}
