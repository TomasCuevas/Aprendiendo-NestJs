import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

//* dtos *//
import { CreateUserDto, LoginUserDto } from './dto';

//* entities *//
import { User } from './entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      });
      await this.userRepository.save(user);

      delete user.password;

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedException(`Credentials are not valid (email)`);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Credentials are not valid (password)`);
    }

    return user;
  }

  private handleDBErrors(error: any): never {
    console.log(error);

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
