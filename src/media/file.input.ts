import {Field, InputType} from 'couchset';

import {MediaDataType} from './media.model';

@InputType()
export class FileInput implements Partial<MediaDataType & File> {
    @Field() filename: string;

    @Field() mimetype: string;

    @Field() encoding: string;
}
