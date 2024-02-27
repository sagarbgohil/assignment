import { Controller, Get, Post, Body, Patch, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('verify')
  verifyOtp(@Body() { email, otp }) {
    return this.usersService.verifyOtp(email, otp);
  }

  @Get('refresh-token')
  refreshToken(@Body() { refreshToken }) {
    return this.usersService.refreshToken(refreshToken);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  findOne(@Req() req: Request) {
    return this.usersService.findOne(req);
  }

  @Patch('')
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    return this.usersService.update(req, updateUserDto);
  }

}
