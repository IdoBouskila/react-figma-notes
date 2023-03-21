import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import * as Popover from '@radix-ui/react-popover';

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
        <Popover.Root 
            defaultOpen={ true } 
            onOpenChange={ (open) => ! open && setPendingNote(null) }
        >
            
            <Popover.Trigger
                className="note" 
                style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }} 
            />
        
            <Popover.Portal>
                <Popover.Content>
                    <form
                    className='create-note-form'
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
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default CreateNoteForm;