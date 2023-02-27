import { Injectable } from '@nestjs/common';

//* dto-inputs-params *//
import { LoginInput, SignupInput } from './dto/inputs';

//* types *//
import { AuthResponse } from './types';

//* services *//
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);

    const token = 'abc123';

    return {
      token,
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;

    const user = await this.usersService.findOneByEmail(email);
    const token = 'abc123';

    return {
      token,
      user,
    };
  }
}
