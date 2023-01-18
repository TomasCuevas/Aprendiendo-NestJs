import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

//* env config *//
import { EnvConfiguration } from './config/app.config';

//* modules *//
import { CommonModule } from './common/common.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),

    CommonModule,
    PokemonModule,
    SeedModule,
  ],
})
export class AppModule {}
