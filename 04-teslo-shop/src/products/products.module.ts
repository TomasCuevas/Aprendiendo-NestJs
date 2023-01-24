import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { ProductsController } from './products.controller';

//* services *//
import { ProductsService } from './products.service';

//* entities *//
import { Product, ProductImage } from './entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
})
export class ProductsModule {}
