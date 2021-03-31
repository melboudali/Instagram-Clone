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
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	text!: string;

	@Field()
	@Column()
	userId!: number;

	@Field()
	@Column()
	imageId!: string;

	@ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
	user!: User;

	@ManyToOne(() => Image, image => image.comment, { onDelete: "CASCADE" })
	image!: Image;

	@Field(() => String)
	@CreateDateColumn()
	created_at!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at!: Date;
}
