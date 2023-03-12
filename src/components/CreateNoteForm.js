import React from 'react';

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
        className='note'
        style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }}
        onSubmit={ handleNoteSubmit }
        >
            <span className='note pin'></span>

            <div className="form-buttons">
                <input type="text" name="text"/>
                <button>Create Note</button>
            </div>
        </form>
    );
};

export default CreateNoteForm;