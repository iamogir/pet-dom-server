import { Controller, Get } from '@nestjs/common';
import { AiService } from '../service/ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('test')
  async testAi(): Promise<string> {
    return this.aiService.generatePetAdvice(
      'Give 3 short general care tips for a healthy adult dog.',
    );
  }
}
