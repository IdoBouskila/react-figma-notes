import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Portal from '@radix-ui/react-portal';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/notesSettings';
import NoteForm from './NoteForm';

const CreateNoteForm = ({ pendingNote, setPendingNote }) => {
    const { targetSelector, coords } = pendingNote;
    const dispatch = useDispatch();

    const handleNoteSubmit = (text) => {
        dispatch( addNote({ targetSelector, coords, text }) );
        setPendingNote(null);
    };

    return (
        <Popover.Root
            open={ !! pendingNote }
            onOpenChange={ (open) => ! open && setPendingNote(null) }
            modal={ true }
        >
            <Portal.Root
                className='note'
                container={ document.querySelector(targetSelector) }
            >
                <Popover.Trigger
                    className='create-note-form pin'
                    style={{
                        transform: `translate3d(${
                            coords.x.size + coords.x.unit
                        }, ${ coords.y.size + coords.y.unit }, 0)`
                    }}
                />
            </Portal.Root>

            <Popover.Portal>
                <Popover.Content    
                    sideOffset={ 20 }
                    side='right'
                >
                    <NoteForm onSubmit={ handleNoteSubmit } />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default CreateNoteForm;
