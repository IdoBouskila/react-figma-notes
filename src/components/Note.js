import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Portal from '@radix-ui/react-portal';
import { AiOutlineCheckCircle, AiOutlineClose} from 'react-icons/ai';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteNote, resetActiveEntityId, selectActiveEntityId, setActiveEntityId } from '../redux/notesSettings';
import NoteForm from './NoteForm';

const Note = ({ note }) => {
    const { id, coords, comments, targetSelector } = note;
    const dispatch = useDispatch();
    const activeNoteId = useSelector(selectActiveEntityId);

    return (
        <Popover.Root
            open={ activeNoteId === id }
            onOpenChange={ (isOpen) => isOpen ? dispatch( setActiveEntityId(id) ) : dispatch( resetActiveEntityId() ) }
            modal={ true }
        >
            <Portal.Root
                onClick={ (e) => e.preventDefault() }
                className='note'
                container={ document.querySelector(targetSelector) }
                style={{
                    transform: `translate3d(${ coords.x.size + coords.x.unit }, ${ coords.y.size + coords.y.unit}, 0)`,
                }}
            >
                <Popover.Trigger className='note-pin pin' />
            </Portal.Root>

            <Popover.Portal>
                <Popover.Content
                    className='note-container'
                    side='right'
                    sideOffset={ 20 }
                >
                    <div className='note-header'>
                        <div className='buttons'>
                            <button
                                className='note-icons-btn'
                                onClick={ () => dispatch( deleteNote(id) ) }
                            >
                                <AiOutlineCheckCircle />
                            </button>

                            <Popover.Close className='note-icons-btn'>
                                <AiOutlineClose />
                            </Popover.Close>
                        </div>
                    </div>

                    <div className='comments-container'>
                        { comments.map((comment) => {
                            const { id } = comment;

                            return (
                                <Comment
                                    key={ id }
                                    commentDetails={ comment }
                                />
                            );
                        }) }
                    </div>


                    <div className='form-container'>
                        <img src='https://i.pravatar.cc/300' alt='' />
                        <NoteForm onSubmit={ (text) => dispatch( addComment({ id, text }) ) }/>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default Note;
