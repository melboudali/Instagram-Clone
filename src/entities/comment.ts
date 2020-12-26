import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Image } from './Image';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @Field()
  @Column()
  imageId!: number;

  @Field(() => Image)
  @ManyToOne(() => Image, image => image.comment, { onDelete: 'CASCADE' })
  image: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
