import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import * as Popover from '@radix-ui/react-popover';
import * as Portal from '@radix-ui/react-portal';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/notesSettings';

const CreateNoteForm = ({ pendingNote, setPendingNote }) => {
    const { targetSelector, coords } = pendingNote;
    const dispatch = useDispatch();

    const handleNoteSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        dispatch(
            addNote({
                targetSelector,
                coords,
                text: data.get('text'),
            })
        );

        setPendingNote(null);
    };

    return (
        <Popover.Root open={true}>
            <Portal.Root
                className='note'
                container={ document.querySelector(targetSelector) }
            >
                <Popover.Trigger
                    className='create-note-form pin'
                    style={{
                        transform: `translate3d(${
                            coords.x.size + coords.x.unit
                        }, ${coords.y.size + coords.y.unit}, 0)`,
                    }}
                />
            </Portal.Root>

            <Popover.Portal>
                <Popover.Content
                    onPointerDownOutside={ () => setPendingNote(null) }
                    sideOffset={20}
                    side='right'
                >
                    <form
                        action='#'
                        className='create-note-form'
                        onSubmit={ handleNoteSubmit }
                    >
                        <input
                            type='text'
                            name='text'
                            placeholder='Add a comment'
                        />
                        <button>
                            <AiOutlineArrowUp fill='#fff' />
                        </button>
                    </form>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default CreateNoteForm;
