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

	@Field()
	@Column()
	imageId!: string;

	@Field(() => User)
	@ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
	user!: User;

	@Field(() => Image)
	@ManyToOne(() => Image, image => image.comment, { onDelete: "CASCADE" })
	image!: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at!: Date;
}
