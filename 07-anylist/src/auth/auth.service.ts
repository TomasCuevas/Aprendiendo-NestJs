import { Injectable } from '@nestjs/common';

//* dto-inputs-params *//
import { SignupInput } from './dto/inputs';

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
}
