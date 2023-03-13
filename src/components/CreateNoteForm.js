import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

const CreateNoteForm = ({ pendingNote, setPendingNote, noteDispatch }) => {
    const { coords } = pendingNote;

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        noteDispatch({
            type: 'note_added',
            payload: {
                coords,
                text: data.get('text')
            }
        });

        data.delete('text');
        
        setPendingNote(null);
    }

    return (
        <form
        className='create-note-form'
        style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }}
        onSubmit={ handleNoteSubmit }
        >
            <div className='pin'></div>
            
            <div className="form-buttons">
                <input type="text" name="text" placeholder='Add a comment'/>
                <button>
                    <AiOutlineArrowUp fill='#fff' />
                </button>
            </div>
        </form>
    );
};

export default CreateNoteForm;