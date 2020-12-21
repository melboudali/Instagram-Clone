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
import { Image } from './image';
import { Comment } from './comment';
import { Like } from './like';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ default: '' })
  name!: string;

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

  @OneToMany(() => Image, img => img.user)
  images: Image[];

  @OneToMany(() => Like, like => like.user)
  like: Comment[];

  @OneToMany(() => Comment, comment => comment.user)
  comment: Comment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
