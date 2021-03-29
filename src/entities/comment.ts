import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	ManyToOne
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";
import { Image } from "./image";

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	text!: string;

	@Column()
	userId!: number;

	@Column()
	imageId!: string;

	@ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
	user!: User;

	@ManyToOne(() => Image, image => image.comment, { onDelete: "CASCADE" })
	image!: Image;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}
