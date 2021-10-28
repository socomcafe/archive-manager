import {SocomArchive} from "../models/SocomArchive";
import {Button} from "@mui/material";
import {MouseEvent} from 'react';

type ArchiveButtonProps = {
    context: { triggerRefresh: () => void; archive: SocomArchive; }
}

export default (props: ArchiveButtonProps) => {
    const context = props.context;

    const closeFile = () => {
        context.archive.closeFile();
        context.triggerRefresh();
    }

    return (
        <Button
            variant="contained"
            component="label"
            onClick={() => closeFile()}>
            Close Archive
        </Button>
    );
}