import FileType_1 from "../entities/FileType_1";
import FileType_2 from "../entities/FileType_2";
import {Button} from "@mui/material";
import {ArchiveType, SocomArchive} from "../models/SocomArchive";
import FileSaver from "file-saver";

type DownloadButtonProps = {
    archive: SocomArchive
}

const DownloadButton = (props: DownloadButtonProps) => {
    const archive = props.archive;

    function download() {
        const file = archive.getSelectedFile() as FileType_1;
        const file1 = new File([file.data], `${file.varName}.${file.name}`, {type: 'application/octet-stream'})
        FileSaver.saveAs(file1);
    }

    return (
        <>
            {archive.getArchiveType() === ArchiveType.Type1 &&
                archive.getSelectedFile() &&
                (archive.getSelectedFile() as FileType_1).varName !== "DEP_" &&
                <Button
                    variant="contained"
                    component="label"
                    onClick={download}>
                    Download File
                </Button>
            }
        </>
    );
}

export default DownloadButton;