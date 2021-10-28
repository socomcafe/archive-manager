import HeaderType_1 from "../entities/HeaderType_1";
import HeaderType_2 from "../entities/HeaderType_2";
import FileType_1 from "../entities/FileType_1";
import FileType_2 from "../entities/FileType_2";
const BrowserBuffer = require('buffer/').Buffer;

enum ArchiveType {
    Type1 = 0xc8,
    Type2 = 0xfc
}

class SocomArchive {
    private _isOpened: boolean;
    private _file?: File;
    private _fileName: string;
    private _data: Buffer;
    private _type: number;
    private _archiveHeader?: HeaderType_1 | HeaderType_2;
    private _archiveFiles?: FileType_1[] | FileType_2[];

    constructor() {
        this._isOpened = false;
        this._fileName = "";
        this._data = BrowserBuffer.from(new Uint8Array());
        this._type = -1;
    }

    private _parseArchive(): boolean {

        this._type = this._data.readUInt32LE(0);

        if (this._type === ArchiveType.Type1) {
            console.log("Type 1");

            let archiveHeader: HeaderType_1 = {
                mainHeaderSize: this._data.readUInt32LE(0),
                fileHeaderSize: this._data.readUInt32LE(4),
                archiveVersion: this._data.readUInt32LE(8),
                archiveHeaderSize: this._data.readUInt32LE(0xc),
                bodySize: this._data.readUInt32LE(0x10),
                unusedID: this._data.readUInt32LE(0x14),
                compression: this._data.readUInt32LE(0x18),
                errors: this._data.readUInt16LE(0x1c),
                warnings: this._data.readUInt16LE(0x1e),
                padding: new Uint32Array({length: 0x2a}),
                fileCount: this._data.readUInt32LE(0xc4),
            };

            this._archiveHeader = archiveHeader;

            const archiveFiles: FileType_1[] = [];

            let fileHeadEntry = this._archiveHeader.mainHeaderSize;
            for (let i = 0; i < this._archiveHeader.fileCount; i++) {
                let curPosition = fileHeadEntry;

                let archiveFullPath: string = "";
                let archiveFileName = "";
                let archiveFileVarName = "";
                let archiveFileDbId = 0;
                let archiveFileEntry = 0;
                let archiveFileSize = 0;
                let archiveFileChecksumV1 = 0;
                let archiveFileEmpty = 0;

                while (this._data[curPosition] > 0) {
                    archiveFullPath += String.fromCharCode(this._data[curPosition]);
                    curPosition++;
                }

                let spTmp = archiveFullPath + "/";
                spTmp = spTmp.replace('\\', '/');
                spTmp = spTmp.replace('\\', '/');
                spTmp = spTmp.replace("//", "/");
                let split = spTmp.split('/');
                archiveFileName = split[split.length - 2];

                for (let i2 = 0; i2 < 4; i2++) {
                    archiveFileVarName += String.fromCharCode(this._data[fileHeadEntry + 0x40 + i2]);
                }
                archiveFileDbId = this._data.readUInt32LE(fileHeadEntry + 0x44);
                archiveFileEntry = this._data.readUInt32LE(fileHeadEntry + 0x48);
                archiveFileSize = this._data.readUInt32LE(fileHeadEntry + 0x4c);
                archiveFileChecksumV1 = this._data.readUInt32LE(fileHeadEntry + 0x50);
                archiveFileEmpty = this._data.readUInt32LE(fileHeadEntry + 0x54);

                console.log(archiveFileVarName)


                let archiveFileContents = new Uint8Array();

                if (archiveFileVarName !== "DEP_") {

                    let archiveFileContents = new Uint8Array({length: archiveFileSize});

                    for (curPosition = 0; curPosition < archiveFileSize; curPosition++)
                        archiveFileContents[curPosition] = this._data[archiveFileEntry + archiveHeader.archiveHeaderSize + curPosition];
                }

                console.log(archiveFullPath);
                console.log(archiveFileName);

                archiveFiles.push({
                    checksumV1: archiveFileChecksumV1,
                    data: archiveFileContents,
                    dbId: archiveFileDbId,
                    empty: archiveFileEmpty,
                    entry: archiveFileEntry,
                    fullPath: archiveFullPath,
                    name: archiveFileName,
                    size: archiveFileSize,
                    varName: archiveFileVarName
                });

                console.log(archiveFiles);

                fileHeadEntry += archiveHeader.fileHeaderSize;
            }

            console.log(`Archive Header : ${JSON.stringify(archiveHeader)}`);

            this._archiveFiles = archiveFiles;

            /*

                BuildDirectoryListings();
                return Convert.ToInt32(ArchiveHead1.FileCount);
             */
            return true;
        } else if(this._type === ArchiveType.Type2) {
            console.log("Type 2");

            /*
            ArchiveOpen = 2;
                ArchiveHead2.MainHeaderSize = BitConverter.ToUInt32(fData, 0);
                ArchiveHead2.unknown1 = BitConverter.ToUInt32(fData, 4);
                ArchiveHead2.unknownID = BitConverter.ToUInt32(fData, 8);
                ArchiveHead2.unknown2 = BitConverter.ToUInt32(fData, 0xc);
                ArchiveHead2.unknown3 = BitConverter.ToUInt32(fData, 0x10);

                i2 = 0x14;
                ArchiveHead2.Version = "";
                while (fData[i2] != 0)
                {
                    ArchiveHead2.Version += Convert.ToChar(fData[i2]);
                    i2++;
                }
                ArchiveHead2.FileCount = BitConverter.ToUInt32(fData, 0x98);
                ArchiveHead2.FileHeaderSize = BitConverter.ToUInt32(fData, 0x9c);

                ArchiveFiles2 = new File_Type2[ArchiveHead2.FileCount];

                i2 = 0xa0;
                for (i = 0; i < ArchiveHead2.FileCount; i++)
                {
                    ArchiveFiles2[i].FileHeadSize = BitConverter.ToUInt32(fData, Convert.ToInt32(i2));

                    uint i3 = i2 + 4;
                    ArchiveFiles2[i].FullPath = "";
                    while (fData[i3] != 0)
                    {
                        ArchiveFiles2[i].FullPath += Convert.ToChar(fData[i3]);
                        i3++;
                    }
                    string spTmp = ArchiveFiles2[i].FullPath + "/";
                    spTmp = spTmp.Replace('\\', '/');
                    spTmp = spTmp.Replace("//", "/");
                    string[] sp = spTmp.Split('/');
                    ArchiveFiles2[i].Name = sp[sp.Length - 2];

                    ArchiveFiles2[i].padding = new byte[(i2+ 0x44) - i3];

                    ArchiveFiles2[i].Entry = BitConverter.ToUInt32(fData, Convert.ToInt32(i2 + 0x44));
                    ArchiveFiles2[i].Size = BitConverter.ToUInt32(fData, Convert.ToInt32(i2 + 0x48));

                    ArchiveFiles2[i].Contents = new byte[ArchiveFiles2[i].Size];
                    for (i3 = 0; i3 < ArchiveFiles2[i].Size; i3++)
                    {
                        ArchiveFiles2[i].Contents[i3] = fData[ArchiveFiles2[i].Entry + i3];
                    }

                    i2 += ArchiveFiles2[i].FileHeadSize;

                }

                BuildDirectoryListings();
                return Convert.ToInt32(ArchiveHead2.FileCount);
             */

        } else {
            console.log("Unknown type");
            this._fileName = "";
            this._isOpened = false;
        }
        return false;
    }

    public async openFile(file: File) {
        this._file = file;

        this._isOpened = true;
        this._fileName = this._file?.name ? this._file.name : "";
        this._data = BrowserBuffer.from(await file.arrayBuffer());
        return this._parseArchive();
    }

    public closeFile() {
        this._file = undefined;
        this._fileName = "";
        this._isOpened = false;
        this._archiveFiles = [];
    }

    public getFileName(): string {
        return this._fileName;
    }

    public isOpened(): boolean {
        return this._isOpened;
    }

    public files() {
        return this._archiveFiles;
    }
}

export {SocomArchive};