import { Mutation, Resolver } from '@nestjs/graphql';

//* services *//
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  //! execute seed
  @Mutation(() => Boolean, { name: 'executeSeed' })
  async executeSeed(): Promise<boolean> {
    return this.seedService.executeSeed();
  }
}
