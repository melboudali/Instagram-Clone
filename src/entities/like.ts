import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Image } from './Image';

@Entity()
export class Like extends BaseEntity {
  @Column({ type: 'int' })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  @PrimaryColumn()
  imageId: number;

  @ManyToOne(() => Image, image => image.likes, { onDelete: 'CASCADE' })
  image: Image;
}