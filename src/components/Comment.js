import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useDispatch } from 'react-redux';
import { updateComment } from '../redux/notesSettings';
import NoteForm from './NoteForm';
import { formatRelativeTime } from '../utils/helpers';

const Comment = ({ commentDetails }) => {
    const [isCommentEditable, setIsCommentEditable] = useState(false);
    const { id, text, time } = commentDetails;
    const dispatch = useDispatch();
    
    return (
        <div  className='comment'>
            <div className='comment-header'>
                <img src="https://i.pravatar.cc/300" alt="" />
                <strong>John Doe</strong>
                <span className='date'>{ formatRelativeTime(time) }</span>
                                
                {
                    ! isCommentEditable &&
                    <DropdownMenu.Root>
                        <div className='edit-button-container'>
                            <DropdownMenu.Trigger className="edit-button note-icons-btn">
                                    <FiMoreHorizontal />
                            </DropdownMenu.Trigger>
                        </div>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content className='edit-content' sideOffset={ 7 }>
                                <DropdownMenu.Item
                                    className="drop-down-item"
                                    onClick={ () => setIsCommentEditable(true) }
                                >
                                    Edit...
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                }
            </div>
            
            {
                isCommentEditable
                ?
                    <NoteForm
                        defaultInputValue={ text }
                        onSubmit={
                            (newText) => { 
                                dispatch( updateComment({ id, text: newText }) );
                                setIsCommentEditable(false);
                            } 
                        }
                        onCancel={ () => setIsCommentEditable(false) }
                    />
                :
                    <p className='comment-content' >
                        { text }
                    </p>
            }
        </div>
    );
};

export default Comment;