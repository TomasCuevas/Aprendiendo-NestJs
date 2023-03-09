import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* resolvers *//
import { ListsResolver } from './lists.resolver';

//* services *//
import { ListsService } from './lists.service';

//* entities *//
import { List } from './entities';

//* modules *//
import { ListItemModule } from '../list-item/list-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), ListItemModule],
  providers: [ListsResolver, ListsService],
  exports: [ListsService, TypeOrmModule],
})
export class ListsModule {}
