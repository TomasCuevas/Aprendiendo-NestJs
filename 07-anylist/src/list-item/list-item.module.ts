import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* resolvers *//
import { ListItemResolver } from './list-item.resolver';

//* services *//
import { ListItemService } from './list-item.service';

//* entities *//
import { ListItem } from './entities/list-item.entity';

//* modules *//
import { ListsModule } from '../lists/lists.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListItem]),
    forwardRef(() => ListsModule),
  ],
  providers: [ListItemResolver, ListItemService],
  exports: [TypeOrmModule, ListItemService],
})
export class ListItemModule {}
