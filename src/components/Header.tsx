import {alpha, AppBar, styled, Toolbar, Typography} from "@mui/material";
import {useContext} from "react";
import {SocomArchiveDataContext} from "../datacontexts/ArchiveContext";
import {SocomArchive} from "../models/SocomArchive";
import CloseArchiveButton from "./CloseArchiveButton";
import OpenArchiveButton from "./OpenArchiveButton";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const Header = () => {
    const socomArchive: { triggerRefresh: () => void; archive: SocomArchive; } = useContext(SocomArchiveDataContext);

    let button: JSX.Element;

    if (socomArchive.archive.isOpened()) {
        button = <CloseArchiveButton context={socomArchive} />;
    } else {
        button = <OpenArchiveButton context={socomArchive} />;
    }

    return (
        <SocomArchiveDataContext.Consumer>
            {context => (
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            {context.archive.isOpened() ? `${context.archive.getFileName()} - SOCOM Cafe Archive Manager` : "SOCOM Cafe Archive Manager"}
                        </Typography>
                        <Search>
                            {button}
                        </Search>
                    </Toolbar>
                </AppBar>
            )}
        </SocomArchiveDataContext.Consumer>
    );
};

export default Header;