import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const useMode = () => {
    return useContext(ModeContext);
}

export const ModeProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);
    const [url, setUrl] = useState('https://beta.reactjs.org/');

    const value = {
        editMode,
        toggleEditMode: () => setEditMode((prev) => ! prev),
        url,
        setUrl
    };

    return (
        <ModeContext.Provider value={ value }>
            {children}
        </ModeContext.Provider>
    );
};
