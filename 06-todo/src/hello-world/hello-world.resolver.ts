import { Resolver, Query, Float, Int } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: '"Hello World" is what returns',
  })
  helloWorld(): string {
    return 'Hello World!';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Return a float number between 0 and 100',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'Return a number between 0 and 10',
  })
  getRandomFromZeroTo(): number {
    return +(Math.random() * 10).toFixed();
  }
}
