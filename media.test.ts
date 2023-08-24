import "dotenv/config";

import { uploadFileToFastdfs } from './src/media/media.methods';

uploadFileToFastdfs("/tmp/ggg", "newidtwo").then((res) => {
    console.log("res:", res);
});