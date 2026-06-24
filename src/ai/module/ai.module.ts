import { Module } from '@nestjs/common';
import { AiService } from '../service/ai.service';
import { AiController } from '../controller/ai.controller';
import { PetService } from '../../pet/service/pet.service';

@Module({
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {}
