import { Module } from '@nestjs/common';

//* resolver *//
import { HelloWorldResolver } from './hello-world.resolver';

@Module({
  providers: [HelloWorldResolver],
})
export class HelloWorldModule {}
