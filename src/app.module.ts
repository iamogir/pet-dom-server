import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/module/pet.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';
import { UserModule } from './user/module/user.module';
import { StorageModule } from './storage/storage.module';
import { AiModule } from './ai/module/ai.module';
import { AiController } from './ai/controller/ai.controller';

@Module({
  imports: [
    PetModule,
    UserModule,
    PrismaModule,
    AuthModule,
    StorageModule,
    AiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategyService],
})
export class AppModule {}
