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

@Entity()
@ObjectType()
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
	gender!: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	phone_number!: number;

	@Field()
	@Column({
		default:
			"https://res.cloudinary.com/elboudali/image/upload/v1615221365/Instagram-Clone/44884218_345707102882519_2446069589734326272_n_htmp8n.jpg"
	})
	image_link!: string;

	@Field()
	@Column({ default: false })
	verified!: boolean;

	@Field()
	@Column({ default: false })
	private!: boolean;

	@Field()
	@Column({ default: false })
	disabled!: boolean;

	@Field()
	@Column({ default: true })
	recomended!: boolean;

	@Field()
	images_length?: number;

	@Field(() => [Image])
	@OneToMany(() => Image, image => image.user)
	images?: Image[];

	@OneToMany(() => Follower, follower => follower.user)
	followers!: Follower[];

	// @Field(() => [Follower], { nullable: true })
	// @ManyToMany(() => Follower, follower => follower.user)
	// following: Follower[];

	@OneToMany(() => Like, like => like.user)
	like!: Like[];

	@OneToMany(() => Comment, comment => comment.user)
	comments!: Comment[];

	@Field(() => String)
	@CreateDateColumn()
	created_at!: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updated_at!: Date;
}
