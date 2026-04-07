import { Injectable } from '@nestjs/common';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {
  }
}
