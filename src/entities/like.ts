import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { Image } from "./image";

@Entity()
export class Like extends BaseEntity {
	@PrimaryColumn()
	user_id: number;

	@ManyToOne(() => User, user => user.likes)
	user: User;

	@PrimaryColumn("uuid")
	image_id: string;

	@ManyToOne(() => Image, image => image.likes, { onDelete: "CASCADE" })
	image: Image;
}
