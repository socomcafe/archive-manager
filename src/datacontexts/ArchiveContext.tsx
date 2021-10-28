import {createContext, useState} from "react";
import {SocomArchive} from "../models/SocomArchive";

type Props = {
    children: JSX.Element | JSX.Element[];
};

const SocomArchiveDataContext = createContext({
    triggerRefresh: () => {},
    archive: new SocomArchive(),
});

const SocomArchiveDataContextProvider = ({ children }: Props) => {
    const [refresh, setRefresh] = useState(false);
    const [archive, setArchive] = useState(new SocomArchive())

    function triggerRefresh() {
        setRefresh(!refresh);
    }

    return (
        <SocomArchiveDataContext.Provider value={{triggerRefresh, archive}}>
            {children}
        </SocomArchiveDataContext.Provider>

    );

};

export { SocomArchiveDataContext, SocomArchiveDataContextProvider };