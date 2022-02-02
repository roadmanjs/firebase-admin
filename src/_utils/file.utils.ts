/**
 * Get file extension
 * @param mimetype
 * @returns
 */
export const getFileExtension = (mimetype: string) => {
    return (mimetype || 'image/png').split('/')[1];
};
