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
import { Auth, GetRawHeaders, GetUser, RoleProtected } from './decorators';

//* custom guards *//
import { UserRoleGuard } from './guards';

//* services *//
import { AuthService } from './auth.service';

//* entities *//
import { User } from './entities';

//* interfaces *//
import { IValidRoles } from './interfaces/validRoles.interface';

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

  //! check status
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkStatus(user);
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

  //! private route 2
  @Get('private2')
  // @SetMetadata('roles', ['admin', 'super-user'])
  @RoleProtected(IValidRoles.superUser, IValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  //! private route 3
  @Get('private3')
  // @RoleProtected(IValidRoles.superUser, IValidRoles.admin)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  @Auth(IValidRoles.admin, IValidRoles.superUser)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
