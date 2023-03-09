import { Injectable } from '@nestjs/common';

//* dto-inputs-args *//
import { CreateListItemInput, UpdateListItemInput } from './dto/inputs';

@Injectable()
export class ListItemService {
  create(createListItemInput: CreateListItemInput) {
    return 'This action adds a new listItem';
  }

  findAll() {
    return `This action returns all listItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listItem`;
  }

  update(id: number, updateListItemInput: UpdateListItemInput) {
    return `This action updates a #${id} listItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }
}
