import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	OneToMany
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Image } from "./image";
import { Comment } from "./comment";
import { Like } from "./like";
import { Follower } from "./follower";

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
	@Column()
	fullname!: string;

	@Field()
	@Column({ default: "" })
	website: string;

	@Field()
	@Column({ default: "" })
	bio: string;

	@Field()
	@Column({ default: 0 })
	phone_number: number;

	@Field()
	@Column({ default: "https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-74-512.png" })
	image_link: string;

	@Field()
	@Column({ default: false })
	private: boolean;

	@Field(() => [Image], { nullable: true })
	@OneToMany(() => Image, image => image.user)
	images: Image[];

	@Field(() => [Follower], { nullable: true })
	@OneToMany(() => Follower, follower => follower.user)
	followers: Follower[];

	@Field(() => [Follower], { nullable: true })
	@OneToMany(() => Follower, follower => follower.user)
	following: Follower[];

	@OneToMany(() => Like, like => like.user)
	likes: Like[];

	@OneToMany(() => Comment, comment => comment.user)
	comments: Comment[];

	@Field(() => String)
	@CreateDateColumn()
	created_at: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at: Date;
}
