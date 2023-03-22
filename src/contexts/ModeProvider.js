import React, { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const useMode = () => {
    return useContext(ModeContext);
}

export const ModeProvider = ({ children }) => {
    const [isNoteMode, setIsEditMode] = useState(false);
    
    const value = {
        isNoteMode,
        toggleNoteMode: () => setIsEditMode((prev) => ! prev),
    };

    return (
        <ModeContext.Provider value={ value }>
            {children}
        </ModeContext.Provider>
    );
};
