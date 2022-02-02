import {MediaDataTypeFragment} from './media.fragment';
import gql from 'graphql-tag';

export const UPLOAD_FILES_MUTATION = gql`
    mutation UploadFiles($owner: String, $files: [Upload!]!) {
        data: upload(owner: $owner, files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;

export const UPLOAD_STRING_FILES_MUTATION = gql`
    mutation UploadStringFiles($owner: String, $files: [FileStringInput!]!) {
        data: uploadString(owner: $owner, files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;
