import React from 'react';
import { useMode } from '../context/ModeProvider';

const CreateNoteForm = ({ pendingNote, setPendingNote, setNoteList }) => {
    const { url } = useMode();
    const { coords } = pendingNote;

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        setNoteList(prev => {
            return {
                ...prev,
                [url]: [
                    ...prev[url] || [],
                    {
                        coords,
                        comments: [
                            {
                                text: data.get('message'),
                                time: Date.now()
                            }
                        ]
                    }
                ]
            }
        })

        setPendingNote(null);
    }

    return (
        <form
        className='note'
        style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }}
        onSubmit={ handleNoteSubmit }
        >
            <input type="text" name="message"/>
            <button>Create Note</button>
        </form>
    );
};

export default CreateNoteForm;