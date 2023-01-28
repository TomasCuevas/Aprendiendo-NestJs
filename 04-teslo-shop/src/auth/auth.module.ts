import { Module } from '@nestjs/common';
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

    // JwtModule.register({
    //   secret: '123123123',
    //   signOptions: {
    //     expiresIn: '2h',
    //   },
    // }),
  ],
})
export class AuthModule {}
