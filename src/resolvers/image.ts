import { Resolver, Mutation, Arg, ObjectType, Field, UseMiddleware, Ctx } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Image } from '../entities/Image';
import { v4 } from 'uuid';
import path from 'path';
import { isAuth } from '../middleware/isAuthenticated';
import { MyContext } from '../types';

@ObjectType()
class ErrorField {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UploadImageResponse {
  @Field(() => Image, { nullable: true })
  imageData?: Image;
  @Field(() => ErrorField, { nullable: true })
  error?: ErrorField;
}

@Resolver(Image)
export class ImageResolver {
  @Mutation(() => UploadImageResponse)
  @UseMiddleware(isAuth)
  async uploadImage(
    @Arg('file', () => GraphQLUpload) { createReadStream, filename }: FileUpload,
    @Arg('caption') caption: string,
    @Ctx() { req }: MyContext
  ): Promise<UploadImageResponse> {
    return new Promise((resolve, reject) => {
      const { ext, name } = path.parse(filename);
      const imageFileName = `${name}-${v4()}-${Number(new Date())}.${ext}`;

      const userId = req.session.userId;
      if (!caption || caption.length <= 3) {
        reject({ error: { field: 'caption', message: 'Title should be greater than 3!' } });
      }

      createReadStream()
        .pipe(
          createWriteStream(`${__dirname}/../../public/images/${imageFileName}`, {
            autoClose: true
          })
        )
        .on('finish', async () => {
          const post = await Image.create({
            userId,
            title: caption,
            url: `http://localhost:5000/images/${imageFileName}`
          }).save();
          resolve({ imageData: post });
        })
        .on('error', err => {
          reject({ error: { field: 'error', message: err.message } });
        });
    });
  }
}
