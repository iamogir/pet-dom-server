import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PetService } from '../service/pet.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { EditPetDto } from '../dto/edit-pet.dto';
import { FileInterceptor } from '@nestjs/platform-express';

// @UseGuards(JwtAuthGuard)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  addPet(
    @Body() dto: CreatePetDto,
    @Req() req: Request & { user: { id: string } },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.petService.addPet(dto, req.user.id, file);
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

  @UseGuards(JwtAuthGuard)
  @Post('/:id/photo')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.petService.uploadPhoto(id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deletePetById(@Param('id') id: string) {
    return this.petService.deletePetById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/ai-advice')
  getAiAdvice(@Param('id') id: string) {
    return this.petService.getAiAdvice(id);
  }
}
