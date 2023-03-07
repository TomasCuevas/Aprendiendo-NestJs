import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//* entities *//
import { User } from '../../users/entities';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Float)
  quantity: number;

  @ManyToOne(() => User, (user) => user.items)
  @Field(() => User)
  user: User;
}
