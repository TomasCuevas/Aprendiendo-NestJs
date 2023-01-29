import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* dtos *//
import { CreateUserDto, LoginUserDto } from './dto';

//* custom decorators *//
import { GetRawHeaders, GetUser } from './decorators';

//* custom guards *//
import { UserRoleGuard } from './guards';

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
    @GetUser('email') userEmail: User,
    @GetRawHeaders() rawHeaders: string[],
  ) {
    // console.log(request.user);
    // console.log(request.rawHeaders);

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
    };
  }

  @Get('private2')
  @SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
