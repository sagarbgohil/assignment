import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from '../db/db.service';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: DbService,
    private readonly configService: ConfigService) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    // Generate OTP (example)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Save user to database (example)
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
          otp,
        },
      });
    } catch (e) {
      console.log(e);
      throw new NotFoundException('User not found');
    }
    try {
      // Send OTP via email
      await this.sendOtpEmail(email, otp);
    } catch (e) {
      console.log(e);
      return {
        status: 400,
        message: "User created successfully, but failed to send OTP via email",
      }
    }
    return {
      status: 200,
      message: "User created successfully and OTP sent via email",
    }
  }

  async sendOtpEmail(email: string, otp: string) {
    // Configure Nodemailer transporter (example using SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'testdevquick@gmail.com',
        pass: 'hovx ucgv moow rwzl',
      },
    });

    // Define email options
    const mailOptions = {
      from: 'testdevquick@gmail.com',
      to: email,
      subject: 'One-Time Password (OTP) for Registration',
      text: `Your OTP for registration is: ${otp}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      }
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.otp !== otp) {
      throw new NotFoundException('Invalid OTP');
    }

    // update verified flag
    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        verified: true,
      }
    });

    return {
      status: 200,
      message: 'OTP verified successfully',
    };
  }
  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(request) {
    console.log(request.user);
    const { userId } = request.user;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      }
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(request, updateUserDto: UpdateUserDto) {
    const { userId } = request.user;

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      }, data: {
        ...updateUserDto
      }
    })
    return {
      status: 200,
      message: 'User updated successfully',
      data: user
    }
  }

  async refreshToken(refreshToken) {
    const userToken = await this.prismaService.userToken.findUnique({
      where: {
        token: refreshToken,
      }
    })

    if (!userToken) {
      throw new NotFoundException('Invalid refresh token');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userToken.userId,
      }
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const accessToken = jwt.sign({ userId: user.id }, this.configService.get<string>('ACCESS_TOKEN_SECRET'), { expiresIn: '1h' });

    return {
      status: 200,
      message: 'Access token refreshed successfully',
      data: accessToken
    }
  }
}
