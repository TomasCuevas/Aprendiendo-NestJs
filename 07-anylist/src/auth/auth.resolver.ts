import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

//* dto-inputs-params *//
import { SignupInput } from './dto/inputs';

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

  // @Mutation(,{name: 'login'})
  // async login(): Promise<> {
  //   return this.authService.login()
  // }

  // @Query(, {name: 'revalidate'})
  // revalidateToken() {
  //   return this.authService.revalidateToken();
  // }
}
