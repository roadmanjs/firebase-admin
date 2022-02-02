import {awaitTo} from '@stoqey/client-graphql';
import {GraphQLUpload} from 'graphql-upload';
import {promisify} from 'util';
import {finished} from 'stream';
import {Arg, Mutation, Resolver} from 'type-graphql';
import {FileInput} from './file.input';
import {MediaDataModel, MediaDataType} from './media.model';
import {generateUUID} from '../_utils/uuid';
import {getFileExtension} from '../_utils/file.utils';
import {uploadFileToBucket} from './media.methods';
import {log} from '@roadmanjs/logs';
import fs from 'fs';

const finishes = promisify(finished);
@Resolver(MediaDataType)
export class MediaResolver {
    @Mutation(() => [MediaDataType])
    async upload(
        @Arg('files', () => [GraphQLUpload])
        files: FileInput[],
        @Arg('owner', {nullable: true}) owner: string
    ): Promise<MediaDataType[]> {
        const [error, allFiles] = await awaitTo(
            Promise.all(
                files.map(async (file) => {
                    const {encoding, filename, mimetype, ...others}: any = await file;

                    const newFileNameID = generateUUID();
                    const fileExt = getFileExtension(mimetype);

                    const fullfilename = `${newFileNameID}.${fileExt}`;

                    const createReadStream: any = others.createReadStream;

                    log('preview ---------------------------->', {
                        filename,
                        mimetype,
                        encoding,
                        fileExt,
                    });

                    // Save file to local
                    const localFile = `/tmp/${fullfilename}`;
                    const stream = createReadStream();
                    const out = fs.createWriteStream(localFile);
                    stream.pipe(out);
                    await finishes(out);

                    // Save file to cloud
                    const savedToCloudUrl = await uploadFileToBucket(
                        localFile,
                        fullfilename,
                        mimetype
                    );
                    if (!savedToCloudUrl) {
                        throw new Error('Not saved to cloud, please try again');
                    }

                    // Save file to db
                    const newMediaData: MediaDataType = {
                        id: newFileNameID,
                        name: filename,
                        filename,
                        mimetype,
                        encoding,
                        owner,
                        url: savedToCloudUrl,
                    };

                    await MediaDataModel.create<MediaDataType>(newMediaData);

                    // Return file
                    return newMediaData;
                })
            )
        );

        if (allFiles) {
            return allFiles;
        }

        if (error) {
            console.error(error);
        }

        return [];
    }
}

export default MediaResolver;
