import React, { useState } from 'react';
import Note from './Note';
import unique from 'unique-selector';
import { useSelector } from 'react-redux';
import CreateNoteForm from './CreateNoteForm';
import { selectIsNotMode, selectNotes } from '../redux/notesSettings';
import { getCoords, isPinableElement } from '../utils/helpers';

const Page = ({ children }) => {
    const [pendingNote, setPendingNote] = useState(null);
    const isNoteMode = useSelector(selectIsNotMode);
    const notes = useSelector(selectNotes);
    
    const handlePageClick = (e) => {
        e.preventDefault();

        const element = isPinableElement(e.target) ? e.target : e.target.parentElement;
        const elementUniqueSelector = unique(element);

        setPendingNote({
            targetSelector: elementUniqueSelector,
            coords: getCoords(e, element)
        });
    };

    return (
        <>
            <div
                className={ isNoteMode ? 'page-wrapper note-mode' : 'page-wrapper' }
                onClick={ isNoteMode ? handlePageClick : undefined }
            >
                { children }
            </div>

            {
                isNoteMode && pendingNote && (
                    <CreateNoteForm
                        pendingNote={ pendingNote }
                        setPendingNote={ setPendingNote }
                    />
                )
            }

            {
                notes.map((note) => {
                    return (
                        <Note
                            key={ note.id }
                            note={ note }
                        />
                    );
                })
            }
        </>
    );
};

export default Page;
