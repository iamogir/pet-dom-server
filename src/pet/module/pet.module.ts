import { Module } from '@nestjs/common';
import { PetService } from '../service/pet.service';
import { PetController } from '../controller/pet.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PetService],
  controllers: [PetController],
})
export class PetModule {}
