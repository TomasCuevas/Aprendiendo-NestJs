import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* resolvers *//
import { ListsResolver } from './lists.resolver';

//* services *//
import { ListsService } from './lists.service';

//* entities *//
import { List } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListsResolver, ListsService],
  exports: [ListsService, TypeOrmModule],
})
export class ListsModule {}
