import {configureFirebase} from '../firebase';
import fs from 'fs';
import {isEmpty} from 'lodash';
import {log} from '@roadmanjs/logs';
import request from 'request';
// const requests = promisify(request);

export async function uploadFileToBucket(
    filePath: string,
    fileDest: string,
    contentType = 'image/png'
): Promise<string> {
    const {projectId, storage: adminStorage} = await configureFirebase();
    const storage = adminStorage();

    const bucketName = `${projectId}.appspot.com`;

    // const DefaultPlaceholder = `https://storage.googleapis.com/${bucketName}/placeholder.png`;

    // Uploads a local file to the bucket
    try {
        const bucket = storage.bucket(bucketName);
        await bucket.upload(filePath, {
            public: true,
            destination: fileDest,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                contentType,
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                cacheControl: 'no-cache',
                // cacheControl: 'public, max-age=31536000',
            },
        });

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileDest}`;
        log(`Public url -> ${publicUrl}`);
        return publicUrl;
    } catch (error) {
        log('error uploading file', JSON.stringify(error));
        throw error;
    }
}

interface UploadFileToFastdfs {
    domain: string; // 'http://127.0.0.1:8080',
    md5: string; // '584a285174c732d3d0db8d009b1e84c4',
    mtime: number; // 1692895101,
    path: string; // '/group1/default/20230824/12/38/5/ggg',
    retcode: number; // 0,
    retmsg: string; // '',
    scene: string; // 'default',
    scenes: string; // 'default',
    size: number; // 8,
    src: string; // '/group1/default/20230824/12/38/5/ggg',
    url: string; // 'http://127.0.0.1:8080/group1/default/20230824/12/38/5/ggg?name=ggg&download=1'
}

export const uploadFileToFastdfs = (
    filePath: string,
    fileDest: string
): Promise<UploadFileToFastdfs> =>
    new Promise((resolve, reject) => {
        const fastdfsServer = process.env.FASTDFS_SERVER + '/group1/upload';

        if (isEmpty(fastdfsServer)) {
            return reject('FASTDFS_SERVER is not defined');
        }
        const req = request.post(fastdfsServer, function (err, resp, body) {
            if (err) {
                return reject(err);
            }
            try {
                const {data} = JSON.parse(body);
                return resolve(data);
            } catch (err) {
                return reject(err);
            }
        });
        const form = req.form();
        form.append('scene', 'default');
        form.append('output', 'json2');
        form.append('filename', fileDest);
        form.append('file', fs.createReadStream(filePath));
    });
