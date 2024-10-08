import {configureFirebase} from '../firebase';
import {log} from '@roadmanjs/logs';
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
