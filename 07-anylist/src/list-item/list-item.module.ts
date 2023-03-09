import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* resolvers *//
import { ListItemResolver } from './list-item.resolver';

//* services *//
import { ListItemService } from './list-item.service';

//* entities *//
import { ListItem } from './entities/list-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListItem])],
  providers: [ListItemResolver, ListItemService],
  exports: [TypeOrmModule, ListItemService],
})
export class ListItemModule {}
