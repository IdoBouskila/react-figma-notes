import React, { useRef, useState } from 'react';
import { useMode } from '../contexts/ModeProvider';
import CreateNoteForm from './CreateNoteForm';
import Note from './Note';

const Page = () => {
    const pageRef = useRef(null);
    const { url, editMode } = useMode();
    const [ noteList, setNoteList] = useState({});
    const [pendingNote, setPendingNote] = useState(null);

    const handleOverlayClick = (e) => {
        const bounds = pageRef.current.getBoundingClientRect();

        setPendingNote(
        {
            coords: {
                x: {
                    size: (e.clientX / window.innerWidth) * 100 + 2,
                    unit: 'vw'
                },
                y: {
                    size: e.clientY - bounds.top,
                    unit: 'px'
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
                            pendingNote={ pendingNote }
                            setPendingNote={ setPendingNote }
                            setNoteList={ setNoteList }
                            />
                    }
                </>
                
            }
            {
                noteList[url] &&
                    Object.keys(noteList[url]).map((key) => {
                        return <Note noteDetails={ noteList[url][key] }/>
                    })
            }
        </div>
    );
};

export default Page;