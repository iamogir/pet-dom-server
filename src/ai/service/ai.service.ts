import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import * as process from 'node:process';

@Injectable()
export class AiService {
  private readonly groq: Groq;

  constructor() {
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  async generatePetAdvice(prompt: string): Promise<string> {
    const completion = await this.groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return completion.choices[0]?.message?.content ?? 'No advice';
  }
}
