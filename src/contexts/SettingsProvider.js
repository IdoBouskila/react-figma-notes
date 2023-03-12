import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
    return useContext(SettingsContext);
}

export const SettingsProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);
    const [url, setUrl] = useState('https://beta.reactjs.org/');

    const value = {
        editMode,
        toggleEditMode: () => setEditMode((prev) => ! prev),
        url,
        setUrl
    };

    return (
        <SettingsContext.Provider value={ value }>
            {children}
        </SettingsContext.Provider>
    );
};
