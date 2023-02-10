import { Resolver, Query, Float } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: '"Hello World" is what returns',
  })
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }
}
