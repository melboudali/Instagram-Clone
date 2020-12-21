import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Image } from './image';

@Entity()
export class Like extends BaseEntity {
  @Column({ type: 'int' })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, user => user.like)
  user: User;

  @PrimaryColumn()
  imageId: number;

  @ManyToOne(() => Image, image => image.like, { onDelete: 'CASCADE' })
  image: Image;
}
