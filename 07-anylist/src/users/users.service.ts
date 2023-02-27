import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* entity *//
import { User } from './entities/user.entity';

//* dto-input-params *//
import { CreateUserInput, UpdateUserInput } from './dto/input';
import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersReposity: Repository<User>,
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersReposity.create(signupInput);
      return await this.usersReposity.save(newUser);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Something went wrong!`);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error('findOne method not implemented');
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string) {
    throw new Error('block method not implemented');
  }
}
