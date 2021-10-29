import {SocomArchiveDataContext} from "../datacontexts/ArchiveContext";
import {Box, Button, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ArchiveType} from "../models/SocomArchive";
import FileType_1 from "../entities/FileType_1";

const ArchiveFileInfo = () => {
    const socomContext = useContext(SocomArchiveDataContext)

    let files = socomContext.archive.files();

    function download() {
        const file = socomContext.archive.files()[socomContext.archive.getSelectedFile()];
        const file1 = new File([(file as FileType_1).data], file.name, {type: ' application/octet-stream'})
        const url = URL.createObjectURL(file1);
        window.location.assign(url);
        URL.revokeObjectURL(url);
    }

    function buildData() {
        if (socomContext.archive.getArchiveType() === ArchiveType.Type1) {
            const thisFiles = files as FileType_1[];

            return (
                <>
                    <Typography variant="body1" gutterBottom component="div">
                        {thisFiles && thisFiles[socomContext.archive.getSelectedFile()] ? `Full Path: ${thisFiles[socomContext.archive.getSelectedFile()].fullPath}` : ""}<br />
                        {thisFiles && thisFiles[socomContext.archive.getSelectedFile()] ? `VarName: ${thisFiles[socomContext.archive.getSelectedFile()].varName}` : ""}<br />
                        {thisFiles && thisFiles[socomContext.archive.getSelectedFile()] ? `DB ID: ${thisFiles[socomContext.archive.getSelectedFile()].dbId}` : ""}<br />
                        {thisFiles && thisFiles[socomContext.archive.getSelectedFile()] ? `Checksum: ${thisFiles[socomContext.archive.getSelectedFile()].checksumV1}` : ""}<br />
                        {thisFiles && thisFiles[socomContext.archive.getSelectedFile()] ? `Size: ${thisFiles[socomContext.archive.getSelectedFile()].size}` : ""}
                    </Typography>
                        <Button
                            variant="contained"
                            component="label"
                            onClick={download}>
                            Download File
                        </Button>
                </>
            );
        }
    }

    function buildInfo() {
        return (
            <Box sx={{width: '100%', bgcolor: 'background.paper'}} style={({ paddingLeft: '0.8rem' })}>
                <Typography variant="h4" gutterBottom component="div">
                    {files && files[socomContext.archive.getSelectedFile()] ? files[socomContext.archive.getSelectedFile()].name : "Nothing to show"}
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