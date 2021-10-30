import {SocomArchiveDataContext} from "../datacontexts/ArchiveContext";
import {Box, Button, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ArchiveType} from "../models/SocomArchive";
import FileType_1 from "../entities/FileType_1";
import DownloadButton from "./DownloadButton";

const ArchiveFileInfo = () => {
    const socomContext = useContext(SocomArchiveDataContext)

    let files = socomContext.archive.files();

    const thisFile = socomContext.archive.getSelectedFile() as FileType_1; //todo add file type 2 support

    function buildData() {
        if (socomContext.archive.getArchiveType() === ArchiveType.Type1) {
            return (
                <>
                    <Typography variant="body1" gutterBottom component="div">
                        {thisFile ? `Full Path: ${thisFile.fullPath}` : ""}<br />
                        {thisFile ? `VarName: ${thisFile.varName}` : ""}<br />
                        {thisFile ? `DB ID: ${thisFile.dbId}` : ""}<br />
                        {thisFile ? `Checksum: ${thisFile.checksumV1}` : ""}<br />
                        {thisFile ? `Size: ${thisFile.size}` : ""}
                    </Typography>
                        <DownloadButton archive={socomContext.archive} />
                </>
            );
        }
    }

    function buildInfo() {
        return (
            <Box sx={{bgcolor: 'background.paper'}} style={({ paddingLeft: '0.8rem' })}>
                <Typography variant="h4" gutterBottom component="div">
                    {thisFile ? thisFile.name : "Nothing to show"}
                </Typography>
                {buildData()}
            </Box>
        );
    }

    return (
        <SocomArchiveDataContext.Consumer>
            {context => (
                <>
                    {buildInfo()}
                </>
            )}
        </SocomArchiveDataContext.Consumer>
    );
}

export default ArchiveFileInfo;