type FileType_2 = {
    fileHeadSize: number;
    name: string;
    fullPath: string;
    padding: Uint8Array;
    entry: number;
    size: number;
    contents: Uint8Array;
}

export default FileType_2;