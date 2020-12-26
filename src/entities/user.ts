import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Image } from './Image';
import { Comment } from './Comment';
import { Like } from './Like';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  userName!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ default: '' })
  fullName!: string;

  @Field()
  @Column({ default: 'https://' })
  website!: string;

  @Field()
  @Column({ default: '' })
  bio!: string;

  @Field()
  @Column({ default: 0 })
  phoneNumber!: number;

  @Field()
  @Column({ default: '' })
  gender!: string;

  @Field()
  @Column({ default: 'https://searchusers.xyz/img/userb.png' })
  imageUrl!: string;

  @OneToMany(() => Image, image => image.user)
  images: Image[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
