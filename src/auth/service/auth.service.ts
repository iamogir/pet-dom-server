import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { ResponseRegisterDto } from '../dto/register-response.dto';
import { MeResponseDto } from '../dto/me-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<ResponseRegisterDto> {
    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        name: dto.name,
      },
    });

    return new ResponseRegisterDto(
      this.generateToken(newUser.id),
      newUser.id,
      newUser.email,
      newUser.name,
    );
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException();
    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException();

    return { access_token: this.generateToken(user.id) };
  }

  private generateToken(id: string) {
    return this.jwtService.sign({ id });
  }

  async getNe(id: string): Promise<MeResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('smth goes wrong');
    return new MeResponseDto(user.id, user.email, user.name);
  }
}
