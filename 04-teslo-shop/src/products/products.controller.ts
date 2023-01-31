import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

//* dtos *//
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../common/dto';

//* services *//
import { ProductsService } from './products.service';

//* custom decorators *//
import { Auth, GetUser } from '../auth/decorators';

//* entities *//
import { Product } from './entities';
import { User } from '../auth/entities';

//* interfaces *//
import { IValidRoles } from '../auth/interfaces/validRoles.interface';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //! create
  @Post()
  @Auth(IValidRoles.admin)
  @ApiResponse({
    status: 201,
    description: 'Product was created',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  //! findAll
  @Get()
  findAll(@Query() paginationDTO: PaginationDto) {
    return this.productsService.findAll(paginationDTO);
  }

  //! findOne
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  //! update
  @Patch(':id')
  @Auth(IValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  //! remove
  @Delete(':id')
  @Auth(IValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
