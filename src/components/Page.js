import React, { useRef, useState } from 'react';
import { useSettings } from '../contexts/SettingsProvider';
import { useNote } from '../hooks/useNote';
import CreateNoteForm from './CreateNoteForm';
import Note from './Note';

const Page = () => {
    const pageRef = useRef(null);
    const { url, editMode } = useSettings();
    const { notes, dispatch } = useNote();

    const [pendingNote, setPendingNote] = useState(null);

    const handleOverlayClick = (e) => {
        const bounds = pageRef.current.getBoundingClientRect();

        setPendingNote(
        {
            coords: {
                x: {
                    size: (e.clientX / window.innerWidth) * 100,
                    unit: 'vw'
                },
                y: {
                    size: ((e.clientY - bounds.top - 27) / window.innerHeight) * 100,
                    unit: 'vh'
                }
            }
        });
    }

    return (
        <div className='page-wrapper' ref={ pageRef }>
            <iframe src={ url } frameBorder="0"></iframe>
            {
                editMode &&
                <>
                    <div className="overlay" onClick={ handleOverlayClick }></div>

                    {
                        pendingNote &&
                            <CreateNoteForm
                            noteDispatch={ dispatch }
                            pendingNote={ pendingNote }
                            setPendingNote={ setPendingNote }
                            />
                    }
                </>
                
            }
            {
                notes[url] &&
                    Object.keys(notes[url]).map((key) => {
                        return <Note
                                key={ notes[url][key].id }
                                noteDetails={ notes[url][key] }
                                noteDispatch={ dispatch }
                                />
                })
            }
        </div>
    );
};

export default Page;