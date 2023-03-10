import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: true,
    updatedAt: true,
    createdAt: true,
    categoryId: false,
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;

    const user: User = await this.prisma.users.findUnique({
      where: { email },
      select: {
        ...this.userSelect,
        category: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Email ou senha inválidos');
    }

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new NotFoundException('Email ou senha inválidos');
    }

    delete user.password;

    const token: string = this.jwtService.sign({ email });

    return { token, user };
  }
}
