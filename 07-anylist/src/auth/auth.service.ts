import { Injectable } from '@nestjs/common';

//* entity *//
import { User } from '../users/entities';

//* dto-inputs-params *//
import { SignupInput } from './dto/inputs';

//* types *//
import { AuthResponse } from './types';

@Injectable()
export class AuthService {
  // constructor() {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    console.log({ signupInput });
    throw new Error('Not implemented');
  }
}
