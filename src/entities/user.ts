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

	@Field({ nullable: true })
	@Column({ nullable: true })
	website!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	bio!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	phone_number!: number;

	@Field()
	@Column({
		default:
			"https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_ohc=zSwWVl1-uFkAX8fS1DA&oh=f6f65eb2966cd097b66316043fd1c6be&oe=603C4E0F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
	})
	image_link!: string;

	@Field()
	@Column({ default: false })
	verified!: boolean;

	@Field()
	@Column({ default: false })
	private!: boolean;

	@Field(() => [Image])
	@OneToMany(() => Image, image => image.user)
	images!: Image[];

	@OneToMany(() => Follower, follower => follower.user)
	followers!: Follower[];

	// @Field(() => [Follower], { nullable: true })
	// @ManyToMany(() => Follower, follower => follower.user)
	// following: Follower[];

	@OneToMany(() => Like, like => like.user)
	likes!: Like[];

	@OneToMany(() => Comment, comment => comment.user)
	comments!: Comment[];

	@Field(() => String)
	@CreateDateColumn()
	created_at!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at!: Date;
}
