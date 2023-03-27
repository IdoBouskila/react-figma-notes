import React, { useState } from 'react';
import { useMode } from '../contexts/ModeProvider';
import { useNote } from '../hooks/useNote';
import CreateNoteForm from './CreateNoteForm';
import unique from 'unique-selector';
import Note from './Note';

const Page = ({ children }) => {
    const { isNoteMode } = useMode();
    const { notes, dispatch } = useNote();
    const [pendingNote, setPendingNote] = useState(null);
    
    const handlePageClick = (e) => {
        e.preventDefault();

        const elementUniqueSelector = unique(e.target);
        const bounds = e.target.getBoundingClientRect();
        const pinSize = 30;
        
        setPendingNote(
        {
            target_selector: elementUniqueSelector,
            coords: {
                x: {
                    size: ((e.clientX - Math.round(bounds.left) - (pinSize / 2)) / window.innerWidth) * 100,
                    unit: 'vw'
                },
                y: {
                    size: ((e.clientY - Math.round(bounds.top) - (pinSize / 2)) / window.innerHeight) * 100,    
                    unit: 'vh'
                }
            }
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
                            key={ note.id}
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