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

// FASTDFS
export const UPLOAD_FILES_FASTDFS_MUTATION = gql`
    mutation UploadFilesFastdfs($owner: String, $files: [Upload!]!) {
        data: uploadFastdfs(owner: $owner, files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;

export const UPLOAD_STRING_FILES_FASTDFS_MUTATION = gql`
    mutation UploadStringFilesFastdfs($owner: String, $files: [FileStringInput!]!) {
        data: uploadStringFastdfs(owner: $owner, files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;
