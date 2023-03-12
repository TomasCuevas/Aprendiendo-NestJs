import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

//* dto-inputs-params *//
import { LoginInput, SignupInput } from './dto/inputs';

//* types *//
import { AuthResponse } from './types';

//* services *//
import { UsersService } from '../users/users.service';

//* entity *//
import { User } from '../users/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  ///! signup service
  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);
    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  //! login service
  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;

    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException(`Email / Password don't match`);
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  //! validate user for id service
  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user.isActive) {
      throw new UnauthorizedException(`User is inactive, talk with an admin.`);
    }

    delete user.password;

    return user;
  }

  //! revalidate user service
  revalidateUser(user: User): AuthResponse {
    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }
}
