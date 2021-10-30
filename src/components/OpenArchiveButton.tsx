import {SocomArchive} from "../models/SocomArchive";
import {Button} from "@mui/material";
import {ChangeEvent, MouseEventHandler} from "react";

type ArchiveButtonProps = {
    context: { triggerRefresh: () => void; archive: SocomArchive; }
}

export default (props: ArchiveButtonProps) => {
    const context = props.context;

    async function loadFile(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files === null)
            return;

        let file = event.target.files[0];
        console.log(file);

        if (file) {
            let success = await context.archive.openFile(file);
            if (!success)
                alert("Failed to open archive: Unknown Type");
            else
                context.triggerRefresh();
        }
    }

    return (
        <Button
            style={{backgroundColor: "green"}}
            variant="contained"
            component="label">
            Open Archive
            <input
                type="file"
                onChange={loadFile}
                hidden
            />
        </Button>
    );
}