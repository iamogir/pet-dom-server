import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PetService } from '../service/pet.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  addPet(
    @Body() dto: CreatePetDto,
    @Req() req: Request & { user: { id: string } },
  ) {
    return this.petService.addPet(dto, req.user.id);
  }
}
