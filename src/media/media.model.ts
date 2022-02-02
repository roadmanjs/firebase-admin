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

    @Field(() => String, {nullable: true})
    url?: string;

    @Field(() => String, {nullable: true})
    owner?: string;
}

/**
 * GraphQL Types end
 */

export const MediaDataModel: Model = new Model(modelName);

export default MediaDataType;
