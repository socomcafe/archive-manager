import {Box, Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {MouseEvent, useContext, useState} from "react";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import {SocomArchive} from "../models/SocomArchive";
import FileType_1 from "../entities/FileType_1";
import FileType_2 from "../entities/FileType_2";
import {SocomArchiveDataContext} from "../datacontexts/ArchiveContext";

type ArchiveContext = {
    triggerRefresh: () => void;
    archive: SocomArchive;
}

const ArchiveFileList = () => {
    const socomContext: { triggerRefresh: () => void; archive: SocomArchive; } = useContext(SocomArchiveDataContext);

    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLDivElement>, index: number) => {
        setSelectedIndex(index);
    };

    function buildList(context: ArchiveContext) {
        const files = context.archive.files();

        if (files === undefined || files.length < 1)
            return (
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Nothing to show"/>
                </ListItemButton>
            );

        return files.map(function (object: FileType_1 | FileType_2, i) {
            return (
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={object.name}/>
                </ListItemButton>
            );
        });
    }

    return (
        <SocomArchiveDataContext.Consumer>
            {context => (
                <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                    <List component="nav" aria-label="main mailbox folders">
                        {buildList(context)}
                    </List>
                </Box>
            )}
            </SocomArchiveDataContext.Consumer>
    );
}

export default ArchiveFileList;