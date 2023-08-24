import {Field, Model, ObjectType} from 'couchset';

const modelName = 'Media';
/**
 * GraphQL Types start
 */
@ObjectType()
export class MediaDataType {
    @Field(() => String, {nullable: true})
    id?: string;

    @Field(() => String, {nullable: true})
    name?: string;

    @Field(() => String, {nullable: true})
    filename?: string;

    @Field(() => String, {nullable: true})
    mimetype?: string;

    @Field(() => String, {nullable: true})
    encoding?: string;

    @Field(() => String, {
        nullable: true,
        description: 'The server where the file is stored, e.g fastdfs',
    })
    server?: string;

    @Field(() => Number, {nullable: true})
    size?: number;

    @Field(() => String, {nullable: true})
    path?: string;

    @Field(() => String, {nullable: true})
    url?: string;

    @Field(() => String, {nullable: true})
    owner?: string;

    @Field(() => Date, {nullable: true})
    createdAt?: Date;

    @Field(() => Date, {nullable: true})
    updatedAt?: Date;
}

/**
 * GraphQL Types end
 */

export const MediaDataModel: Model = new Model(modelName);

export default MediaDataType;
