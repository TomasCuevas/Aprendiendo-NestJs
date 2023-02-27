import { Injectable } from '@nestjs/common';

//* entity *//
import { User } from './entities/user.entity';

//* dto-input-params *//
import { CreateUserInput, UpdateUserInput } from './dto/input';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
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
