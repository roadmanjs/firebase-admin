import gql from 'graphql-tag';
import {MediaDataTypeFragment} from './media.fragment';

export const UPLOAD_FILES_MUTATION = gql`
    mutation UploadFiles($owner: String, $files: [Upload!]!) {
        data: upload(owner: $owner, files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${MediaDataTypeFragment}
`;
