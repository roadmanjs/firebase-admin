import {Field, InputType} from 'couchset';

import {MediaDataType} from './media.model';

@InputType()
export class FileInput implements Partial<MediaDataType & File> {
    @Field(() => String, {nullable: true}) filename: string;

    @Field(() => String, {nullable: true}) mimetype: string;

    @Field(() => String, {nullable: true}) encoding: string;
}

@InputType('FileStringInput')
export class FileStringInput {
    @Field(() => String, {nullable: true}) filename: string;

    @Field(() => String, {nullable: true}) mimetype: string;

    @Field(() => String, {nullable: true}) uri: string;
}
