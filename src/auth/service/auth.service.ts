import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const hash = await bcrypt.hash(dto.password, 10);
    const bDay = new Date(dto.birthDate);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        country: dto.country,
        gender: dto.gender,
        birthDate: bDay,
        avatarUrl: dto.avatarUrl,
      },
    });

    return new AuthResponseDto(
      this.generateToken(newUser.id),
      newUser.id,
      newUser.email,
      newUser.firstName,
      newUser.lastName,
      newUser.phone,
      newUser.country,
      newUser.gender,
      String(newUser.birthDate),
      newUser.avatarUrl,
    );
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException();
    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException();

    return new AuthResponseDto(
      this.generateToken(user.id),
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.phone,
      user.country,
      user.gender,
      String(user.birthDate),
      user.avatarUrl,
    );
  }

  private generateToken(id: string) {
    return this.jwtService.sign({ id });
  }
}
