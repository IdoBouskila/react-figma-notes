import React, { useState } from 'react';
import Note from './Note';
import unique from 'unique-selector';
import { getCoords } from '../helper';
import { useSelector } from 'react-redux';
import CreateNoteForm from './CreateNoteForm';
import { selectIsNotMode, selectNotes } from '../redux/notesSettings';

const Page = ({ children }) => {
    const [pendingNote, setPendingNote] = useState(null);
    const isNoteMode = useSelector(selectIsNotMode);
    const notes = useSelector(selectNotes);

    const handlePageClick = (e) => {
        e.preventDefault();
        const elementUniqueSelector = unique(e.target);

        setPendingNote({
            targetSelector: elementUniqueSelector,
            coords: getCoords(e)
        });
    };

    return (
        <>
            <div
                className={ isNoteMode ? 'page-wrapper note-mode' : 'page-wrapper' }
                onClick={ handlePageClick }
            >
                {children}
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
