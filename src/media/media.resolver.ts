import {awaitTo} from '@stoqey/client-graphql';
import {promisify} from 'util';
import {finished} from 'stream';
import {Arg, Mutation, Resolver, Ctx, UseMiddleware} from 'type-graphql';
import {FileInput, FileStringInput} from './file.input';
import {MediaDataModel, MediaDataType} from './media.model';
import {generateUUID} from '../_utils/uuid';
import {getFileExtension} from '../_utils/file.utils';
import {uploadFileToBucket} from './media.methods';
import {log} from '@roadmanjs/logs';
import fs from 'fs';
import _get from 'lodash/get';
import {isAuth} from '../middlewares';
import {ContextType} from '../shared';

// TODO
import {GraphQLUpload} from 'graphql-upload';
const finishes = promisify(finished);
@Resolver(MediaDataType)
export class MediaResolver {
    // for web based Files
    @UseMiddleware(isAuth)
    @Mutation(() => [MediaDataType])
    async upload(
        @Ctx() ctx: ContextType,
        @Arg('files', () => [GraphQLUpload], {nullable: false}) files: FileInput[]
    ): Promise<MediaDataType[]> {
        const owner = _get(ctx, 'payload.userId', '');
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

    // For expo strings files in base64
    @UseMiddleware(isAuth)
    @Mutation(() => [MediaDataType])
    async uploadString(
        @Ctx() ctx: ContextType,
        @Arg('files', () => [FileStringInput], {nullable: false})
        files: FileStringInput[]
    ): Promise<MediaDataType[]> {
        const owner = _get(ctx, 'payload.userId', '');
        const [error, allFiles] = await awaitTo(
            Promise.all(
                files.map(async (file) => {
                    const {filename, mimetype, uri}: any = file;

                    const encoding = 'base64';

                    let uriData = uri;

                    const newFileNameID = generateUUID();
                    const fileExt = getFileExtension(mimetype);

                    const fullfilename = `${newFileNameID}.${fileExt}`;

                    log('preview ---------------------------->', {
                        filename,
                        mimetype,
                        fileExt,
                    });

                    // remove the the prefixes
                    // TODO for audio files, and other files, focus on images for now
                    // TODO move to utility
                    if (fileExt === 'png') {
                        uriData = uriData.replace(/^data:image\/png;base64,/, '');
                    }

                    if (fileExt === 'jpeg') {
                        uriData = uriData.replace(/^data:image\/jpeg;base64,/, '');
                    }

                    // Save file to local
                    const localFile = `/tmp/${fullfilename}`;
                    fs.writeFileSync(localFile, uriData, {encoding});

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
