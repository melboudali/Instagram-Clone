import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './user';
import { Like } from './like';
import { Comment } from './comment';

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({ type: 'int', default: 0 })
  likes!: number;

  @Field()
  @Column()
  url!: string;

  @Field(() => Int, { nullable: true })
  likeStatu: number | null;

  @Field()
  @Column()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.images, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Like, like => like.image)
  like: Like[];

  @OneToMany(() => Comment, comment => comment.image)
  comment: Comment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
