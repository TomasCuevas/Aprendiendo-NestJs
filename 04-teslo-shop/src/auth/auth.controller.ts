import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* dtos *//
import { CreateUserDto, LoginUserDto } from './dto';

//* custom decorators *//
import { GetUser } from './decorators';

//* services *//
import { AuthService } from './auth.service';

//* entities *//
import { User } from './entities';

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

  //! private route
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req() request: Express.Request
    @GetUser() user: User,
  ) {
    // console.log(request.user);

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
    };
  }
}
