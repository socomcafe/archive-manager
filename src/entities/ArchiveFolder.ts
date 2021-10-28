type ArchiveFolder = {
    name: string;
    fileCount: number;
    subFolderCount: number;
    subFolders: ArchiveFolder[];
    fileIndexes: number[];
}

export default ArchiveFolder;