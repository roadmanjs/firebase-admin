"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_FILES_MUTATION = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const media_fragment_1 = require("./media.fragment");
exports.UPLOAD_FILES_MUTATION = (0, graphql_tag_1.default) `
    mutation UploadFiles($owner: String, $files: [Upload!]!) {
        data: upload(owner: $owner, files: $files) {
            ...MediaDataTypeFragment
        }
    }
    ${media_fragment_1.MediaDataTypeFragment}
`;
//# sourceMappingURL=media.mutation.js.map