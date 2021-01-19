import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@Resolver()
export class ImageResolver {
  @Mutation(() => Boolean)
  async uploadImage(
    @Arg('file', () => GraphQLUpload) { createReadStream, mimetype, filename }: FileUpload
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (mimetype === 'image/jpeg') {
        const newFileName = Number(new Date()) + filename;
        createReadStream()
          .pipe(
            createWriteStream(`${__dirname}/../../images/${newFileName}`, {
              autoClose: true
            })
          )
          .on('finish', () => resolve(true))
          .on('error', () => reject(false));
      } else {
        reject(false);
        return;
      }
    });
  }
}
