import { Entity, BaseEntity, PrimaryColumn, ManyToMany } from "typeorm";
import { User } from "./user";

@Entity()
export class Follower extends BaseEntity {
	@PrimaryColumn()
	user_id: number;

	@PrimaryColumn()
	follower_id: number;

	@ManyToMany(() => User, user => user.followers)
	user: User;
}
