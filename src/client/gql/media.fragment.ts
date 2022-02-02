import gql from 'graphql-tag';

export interface FileStringInput {
    filename?: string;
    mimetype: string;
    uri: string;
}

export interface MediaDataType {
    id?: string;
    name?: string;
    owner?: string;
    filename?: string;
    mimetype?: string;
    encoding?: string;
    url?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const MediaDataTypeFragment = gql`
    fragment MediaDataTypeFragment on MediaDataType {
        id
        name
        owner
        filename
        mimetype
        encoding
        url
    }
`;
