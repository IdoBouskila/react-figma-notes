import React, { useState } from 'react';
import { useMode } from '../contexts/ModeProvider';
import { useNote } from '../hooks/useNote';
import CreateNoteForm from './CreateNoteForm';
import unique from 'unique-selector';
import Note from './Note';
import { getCoords } from '../helper';

const Page = ({ children }) => {
    // TODO: Maybe move everyting to the context
    const { isNoteMode } = useMode();
    const { notes, dispatch } = useNote();
    const [ pendingNote, setPendingNote ] = useState(null);
    
    const handlePageClick = (e) => {
        e.preventDefault();
        const elementUniqueSelector = unique(e.target);
        
        setPendingNote(
        {
            targetSelector: elementUniqueSelector,
            coords: getCoords(e)
        });
    }

    return (
        <>
            <div
                className={ isNoteMode ? 'page-wrapper note-mode' : 'page-wrapper' }
                onClick={ handlePageClick }
            >
                { children }
            </div>

            {
                (isNoteMode && pendingNote) &&
                    <CreateNoteForm
                        noteDispatch={ dispatch }
                        pendingNote={ pendingNote }
                        setPendingNote={ setPendingNote }
                    />
            }

            {
                notes.map(note => {
                    return (
                        <Note
                            key={ note.id }
                            noteDetails={ note }
                            noteDispatch={ dispatch }
                        />
                    )
                })
            }
        </>
    );
};

export default Page;