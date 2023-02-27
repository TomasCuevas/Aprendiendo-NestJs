import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

//* dto-inputs-params *//
import { SignupInput, LoginInput } from './dto/inputs';

//* service *//
import { AuthService } from './auth.service';

//* types *//
import { AuthResponse } from './types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  // @Query(, {name: 'revalidate'})
  // revalidateToken() {
  //   return this.authService.revalidateToken();
  // }
}
