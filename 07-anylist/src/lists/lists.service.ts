import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//* dto-inputs-args *//
import { CreateListInput, UpdateListInput } from './dto/inputs';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

//* entities *//
import { List } from './entities';
import { User } from '../users/entities';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private readonly listsRepository: Repository<List>,
  ) {}

  //! create list
  async create(
    createListInput: CreateListInput,
    createBy: User,
  ): Promise<List> {
    const newList = this.listsRepository.create({
      ...createListInput,
      user: createBy,
    });

    return await this.listsRepository.save(newList);
  }

  //! find all lists by user
  async findAll(
    user: User,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<List[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    //? with queryBuilder
    const queryBuilder = this.listsRepository
      .createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"userId" = :userId`, { userId: user.id });

    if (search) {
      queryBuilder.andWhere('LOWER(name) like :name', {
        name: `%${search.toLowerCase()}%`,
      });
    }

    return queryBuilder.getMany();
  }

  //! find one list by user
  async findOne(id: string, user: User): Promise<List> {
    const list = await this.listsRepository.findOneBy({
      id,
      user: { id: user.id },
    });
    if (!list) {
      throw new NotFoundException(`List with id: ${id} not found.`);
    }

    return list;
  }

  //! update list
  async update(
    id: string,
    updateListInput: UpdateListInput,
    updateBy: User,
  ): Promise<List> {
    await this.findOne(id, updateBy);
    const list = await this.listsRepository.preload({
      ...updateListInput,
      user: updateBy,
    });

    return await this.listsRepository.save(list);
  }

  //! remove list
  async remove(id: string, deleteBy: User): Promise<List> {
    const list = await this.findOne(id, deleteBy);
    await this.listsRepository.remove(list);

    return { ...list, id };
  }
}
