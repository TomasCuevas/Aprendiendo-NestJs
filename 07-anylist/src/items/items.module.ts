import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* resolvers *//
import { ItemsResolver } from './items.resolver';

//* services *//
import { ItemsService } from './items.service';

//* entities *//
import { Item } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
