import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class ImageResolver {
  @Mutation(() => Boolean)
  async uploadImage(
    @Arg('picture', () => GraphQLUpload) { filename }: FileUpload
  ): Promise<boolean> {
    // return new Promise((resolve, reject) => {
    //   if (mimetype === 'image/jpeg') {
    //     const newFileName = Number(new Date()) + filename;
    //     createReadStream()
    //       .pipe(
    //         createWriteStream(`${__dirname}/../../images/${newFileName}`, {
    //           autoClose: true
    //         })
    //       )
    //       .on('finish', () => resolve(true))
    //       .on('error', () => reject(false));
    //   } else {
    //     reject(false);
    //     return;
    //   }
    // });
    console.log(filename);
    return true;
  }
}
