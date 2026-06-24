import { Module } from '@nestjs/common';
import { PetService } from '../service/pet.service';
import { PetController } from '../controller/pet.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { StorageModule } from '../../storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  providers: [PetService],
  controllers: [PetController],
})
export class PetModule {}
