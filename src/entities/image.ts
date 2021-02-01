import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	ManyToOne,
	OneToMany
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { User } from "./user";
import { Like } from "./like";
import { Comment } from "./comment";

@ObjectType()
@Entity()
export class Image extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Field()
	@Column()
	caption!: string;

	@Field()
	@Column()
	image_url!: string;

	@Field()
	@Column({ default: 0 })
	likes: number;

	@Field(() => Boolean, { defaultValue: false })
	like_status: boolean;

	@Field()
	@Column()
	user_id!: number;

	@ManyToOne(() => User, user => user.images, { onDelete: "CASCADE" })
	user: User;

	@OneToMany(() => Like, like => like.image)
	like: Like[];

	@OneToMany(() => Comment, comment => comment.image)
	comment: Comment[];

	@Field(() => String)
	@CreateDateColumn()
	created_at: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at: Date;
}
