import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* resolver *//
import { ItemsResolver } from './items.resolver';

//* service *//
import { ItemsService } from './items.service';

//* entity *//
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
