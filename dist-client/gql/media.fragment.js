"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaDataTypeFragment = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.MediaDataTypeFragment = (0, graphql_tag_1.default) `
    fragment MediaDataTypeFragment on MediaDataType {
        id
        name
        owner
        filename
        mimetype
        encoding
        url
        createdAt
        updatedAt
    }
`;
//# sourceMappingURL=media.fragment.js.map