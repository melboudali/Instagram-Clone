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
	user_id!: number;

	@Field()
	@Column()
	image_id!: number;

	@Field(() => User)
	@ManyToOne(() => User, user => user.comments, { onDelete: "CASCADE" })
	user: User;

	@Field(() => Image)
	@ManyToOne(() => Image, image => image.comment, { onDelete: "CASCADE" })
	image: User;

	@Field(() => String)
	@CreateDateColumn()
	created_at: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at: Date;
}
