import { Resolver, Mutation, Arg, ObjectType, Field } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { v4 } from 'uuid';
import path from 'path';

@ObjectType()
class UploadImageResponse {
  @Field()
  imageUrl?: string;
}

@Resolver()
export class ImageResolver {
  @Mutation(() => UploadImageResponse)
  async uploadImage(
    @Arg('file', () => GraphQLUpload) { createReadStream, filename }: FileUpload
  ): Promise<UploadImageResponse> {
    return new Promise((resolve, reject) => {
      const { ext, name } = path.parse(filename);
      const imageFileName = `${name}-${v4()}-${Number(new Date())}.${ext}`;

      createReadStream()
        .pipe(
          createWriteStream(`${__dirname}/../../public/images/${imageFileName}`, {
            autoClose: true
          })
        )
        .on('finish', () =>
          resolve({ imageUrl: `http://localhost:5000/images/${imageFileName}` })
        )
        .on('error', () => reject());
    });
  }
}
