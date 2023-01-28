import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { AuthController } from './auth.controller';

//* services *//
import { AuthService } from './auth.service';

//* entities *//
import { User } from './entities';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log(process.env.JWT_SECRET)
        // console.log(configService.get('JWT_SECRET'));

        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
    // JwtModule.register({
    //   secret: '123123123',
    //   signOptions: {
    //     expiresIn: '2h',
    //   },
    // }),
  ],
})
export class AuthModule {}
