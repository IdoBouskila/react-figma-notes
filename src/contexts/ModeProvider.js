import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const useMode = () => {
    return useContext(ModeContext);
}

export const ModeProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);
    
    const value = {
        editMode,
        toggleEditMode: () => setEditMode((prev) => ! prev),
    };

    return (
        <ModeContext.Provider value={ value }>
            {children}
        </ModeContext.Provider>
    );
};
