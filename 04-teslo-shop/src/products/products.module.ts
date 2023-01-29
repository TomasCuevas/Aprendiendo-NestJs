import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//* controllers *//
import { ProductsController } from './products.controller';

//* services *//
import { ProductsService } from './products.service';

//* entities *//
import { Product, ProductImage } from './entities';

//* modules *//
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, ProductImage]), AuthModule],
  exports: [ProductsService],
})
export class ProductsModule {}
