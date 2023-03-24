import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import * as Popover from '@radix-ui/react-popover';
import * as Portal from '@radix-ui/react-portal'

const CreateNoteForm = ({ pendingNote, setPendingNote, noteDispatch }) => {
    const { target_selector, coords } = pendingNote;

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData(e.target);

        noteDispatch({
            type: 'note_added',
            payload: {
                target_selector,
                coords,
                text: data.get('text')
            }
        });

        data.delete('text');
        
        setPendingNote(null);
    }

    return (
        <Popover.Root 
            open={ true }
        >
            <Portal.Root
                className='note'
                container={ document.querySelector(target_selector) }
            >
                <Popover.Trigger
                    className="create-note-form pin"
                    style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }} 
                />
            </Portal.Root>
        
            <Popover.Portal>
                <Popover.Content
                    onPointerDownOutside={ () => setPendingNote(null) }
                    sideOffset={ 20 }
                    side='right' 
                >
                    <form
                    action="#"
                    className='create-note-form'
                    onSubmit={ handleNoteSubmit }
                    >
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