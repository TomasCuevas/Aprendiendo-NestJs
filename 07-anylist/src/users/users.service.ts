import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

//* entity *//
import { User } from './entities/user.entity';

//* enum *//
import { ValidRoles } from '../auth/enums';

//* dto-inputs-params *//
import { CreateUserInput, UpdateUserInput } from './dto/input';
import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User) private readonly usersReposity: Repository<User>,
  ) {}

  //! create user
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

  //! find all users
  async findAll(roles: ValidRoles[]): Promise<User[]> {
    if (roles.length === 0) return this.usersReposity.find();

    return this.usersReposity
      .createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany();
  }

  //! find user by email
  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersReposity.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException(`User with email '${email}' not found.`);
    }
  }

  //! find user by id
  async findOneById(id: string): Promise<User> {
    try {
      return await this.usersReposity.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`User with id '${id}' not found.`);
    }
  }

  //! update user
  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  //! block user
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
