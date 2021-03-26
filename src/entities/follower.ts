import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
@ObjectType()
export class Follower extends BaseEntity {
	@PrimaryColumn()
	userId!: number;

	@PrimaryColumn()
	followerId!: number;

	@ManyToOne(() => User, user => user.followers, { onDelete: "CASCADE" })
	user!: User[];
}
