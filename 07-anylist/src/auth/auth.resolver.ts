import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

//* dto-inputs-params *//
import { SignupInput, LoginInput } from './dto/inputs';

//* service *//
import { AuthService } from './auth.service';

//* types *//
import { AuthResponse } from './types';

//* guards *//
import { JwtAuthGuard } from './guards';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //! signup resolver
  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  //! login resolver
  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  //! revalidate resolver
  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  async revalidateToken(): Promise<AuthResponse> {
    throw new Error('Method revalidate not implemented.');
  }
}
