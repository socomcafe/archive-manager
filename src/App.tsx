import React from 'react';

import './App.css';
import {SocomArchiveDataContextProvider} from "./datacontexts/ArchiveContext";
import {Grid, Paper, styled} from "@mui/material";
import Header from "./components/Header";
import ArchiveFileList from "./components/ArchiveFileList";
import ArchiveFileInfo from "./components/ArchiveFileInfo";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function App() {

  return (
      <SocomArchiveDataContextProvider>
        <Header />
          <Grid container spacing={0} alignItems={"stretch"}>
              <Grid item xs={4} md={4}>
                  <ArchiveFileList />
              </Grid>
              <Grid item xs={8} md={8}>
                  <ArchiveFileInfo />
              </Grid>
          </Grid>

      </SocomArchiveDataContextProvider>
  );
}

export default App;
