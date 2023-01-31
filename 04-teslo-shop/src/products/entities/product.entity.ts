import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist';

//* entities *//
import { User } from '../../auth/entities';

//* entities *//
import { ProductImage } from './product-image.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '5bf7b7ea-964c-45b6-a688-4c796cf637f9',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Men’s 3D Small Wordmark Tee',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: '35',
    description: 'Product price',
    default: 0,
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example:
      'Designed for comfort and style in any size, the Tesla Small Wordmark Tee is made from 100% Peruvian cotton and features a 3D silicone-printed wordmark on the left chest.',
    description: 'Product description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'men_3d_small_wordmark_tee',
    description: 'Product slug - for SEO',
    uniqueItems: true,
  })
  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: 2,
    description: 'Product stock',
    default: 0,
  })
  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['XS', 'S', 'M'],
    description: 'Product sizes',
    default: [],
  })
  @Column({
    type: 'text',
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product gender',
    default: null,
  })
  @Column({
    type: 'text',
  })
  gender: string;

  @ApiProperty({
    example: ['shirt'],
    description: 'Product tags',
    default: [],
  })
  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty({
    example: ['8528839-00-A_0_2000.jpg', '8528839-00-A_2.jpg'],
    description: 'Product images',
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  // @BeforeUpdate()
  // checkSlugUpdate() {
  //   this.slug = this.slug
  //     .toLowerCase()
  //     .replaceAll(' ', '_')
  //     .replaceAll("'", '');
  // }
}
