type HeaderType_1 = {
    mainHeaderSize: number;
    fileHeaderSize: number;
    archiveVersion: number;
    archiveHeaderSize: number;
    bodySize: number;
    unusedID: number;
    compression: number;
    errors: number;
    warnings: number;
    padding: Uint32Array;
    fileCount: number;
}

export default HeaderType_1;