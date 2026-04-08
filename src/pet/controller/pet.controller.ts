import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PetService } from '../service/pet.service';
import { CreatePetDto } from '../dto/create-pet.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('/add_pet')
  addPet(
    @Body() dto: CreatePetDto,
    @Req() req: Request & { user: { id: string } },
  ) {
    console.log(req.user);
    return this.petService.addPet(dto, req.user.id);
  }

  @Get('/all_pets_by_user')
  getAllPetsByUser(@Req() req: Request & { user: { id: string } }) {
    return this.petService.getAllPetsByUser(req.user.id);
  }
}
