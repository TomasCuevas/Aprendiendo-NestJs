import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

//* entities *//
import { User } from './entities/user.entity';

//* enums *//
import { ValidRoles } from '../auth/enums';

//* dto-inputs-args *//
import { UpdateUserInput } from './dto/input';
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
  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    updateBy: User,
  ): Promise<User> {
    try {
      const user = await this.usersReposity.preload({ ...updateUserInput, id });

      user.lastUpdateBy = updateBy;

      return await this.usersReposity.save(user);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  //! block user
  async block(id: string, updateBy: User): Promise<User> {
    const userToBlock = await this.usersReposity.findOneBy({ id });
    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = updateBy;

    return await this.usersReposity.save(userToBlock);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs.');
  }
}
