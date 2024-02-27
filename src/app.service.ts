import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from './db/db.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: DbService,
    private configService: ConfigService) { }


  getHello(): string {
    return 'Hello World!';
  }

  async login(LoginDto: LoginDto) {
    const { email, password } = LoginDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      }
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new NotFoundException('Invalid password');
    }
    // Generate access token
    const accessToken = jwt.sign({ userId: user.id }, this.configService.get<string>('ACCESS_TOKEN_SECRET'), { expiresIn: '1h' });

    // Generate refresh token
    const refreshToken = jwt.sign({ userId: user.id }, this.configService.get<string>('REFRESH_TOKEN_SECRET'), { expiresIn: '15d' });

    // Store refresh token in the table usertoken if not exist
    await this.prismaService.userToken.upsert({
      where: { userId: user.id },
      create: { userId: user.id, token: refreshToken },
      update: { token: refreshToken },
    });

    return { accessToken, refreshToken };
  }

}
