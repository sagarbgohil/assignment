import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(@Body() LoginDto: LoginDto) {
    return this.appService.login(LoginDto);
  }
}
