import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

//* entity *//
import { User } from './entities/user.entity';

//* dto-input-params *//
import { CreateUserInput, UpdateUserInput } from './dto/input';
import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User) private readonly usersReposity: Repository<User>,
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersReposity.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      });
      return await this.usersReposity.save(newUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return this.usersReposity.findOneByOrFail({ email });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string) {
    throw new Error('block method not implemented');
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs.');
  }
}
