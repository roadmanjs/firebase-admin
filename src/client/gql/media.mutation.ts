import {MediaDataTypeFragment} from './media.fragment';
import gql from 'graphql-tag';

export const UPLOAD_FILES_MUTATION = gql`
    mutation UploadFiles($files: [Upload!]!) {
        data: upload(files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;

export const UPLOAD_STRING_FILES_MUTATION = gql`
    mutation UploadStringFiles($files: [FileStringInput!]!) {
        data: uploadString(files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;

// FASTDFS
export const UPLOAD_FILES_FASTDFS_MUTATION = gql`
    mutation UploadFilesFastdfs($files: [Upload!]!) {
        data: uploadFastdfs(files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;

export const UPLOAD_STRING_FILES_FASTDFS_MUTATION = gql`
    mutation UploadStringFilesFastdfs($files: [FileStringInput!]!) {
        data: uploadStringFastdfs(files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;
