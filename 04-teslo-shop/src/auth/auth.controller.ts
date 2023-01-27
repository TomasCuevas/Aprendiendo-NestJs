import { Controller, Post, Body } from '@nestjs/common';

//* dtos *//
import { CreateUserDto } from './dto';

//* services *//
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
