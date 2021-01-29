import { ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Follower extends BaseEntity {
	@PrimaryColumn()
	user_id: number;

	@PrimaryColumn()
	follower_id: number;

	@ManyToOne(() => User, user => user.followers, { onDelete: "CASCADE" })
	user: User[];
}
