import { Controller, Post, Body } from '@nestjs/common';

//* dtos *//
import { CreateUserDto, LoginUserDto } from './dto';

//* services *//
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //! create
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  //! login
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
