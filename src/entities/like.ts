import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { Image } from "./image";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Like extends BaseEntity {
	@Field()
	@PrimaryColumn()
	userId!: number;

	@ManyToOne(() => User, user => user.like, { onDelete: "CASCADE" })
	user!: User;

	@Field()
	@PrimaryColumn("uuid")
	imageId!: string;

	@ManyToOne(() => Image, image => image.like, { onDelete: "CASCADE" })
	image!: Image;
}
