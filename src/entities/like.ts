import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { Image } from "./image";

@Entity()
export class Like extends BaseEntity {
	@PrimaryColumn()
	userId: number;

	@ManyToOne(() => User, user => user.likes)
	user: User;

	@PrimaryColumn("uuid")
	imageId: string;

	@ManyToOne(() => Image, image => image.likes, { onDelete: "CASCADE" })
	image: Image;
}
