import React, { useRef, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineArrowUp } from 'react-icons/ai';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const Comment = ({ commentDetails, noteDispatch }) => {
    const [isCommentEditable, setIsCommentEditable] = useState(false);
    const editCommentInputRef = useRef();
    const { id, text, time } = commentDetails;

    const handleEditCommentSubmit = (e) => {
        e.preventDefault();

        noteDispatch({
            type: 'comment_updated',
            payload: {
                id,
                text: editCommentInputRef.current.value
            }   
        })

        setIsCommentEditable(false);
    }
    
    return (
        <div  className='comment'>
            <div className='comment-header'>
                <img src="https://i.pravatar.cc/300" alt="" />
                <strong>Ido Bouskila</strong>
                <span className='date'>25 minutes ago</span>
                                
                {
                    ! isCommentEditable &&
                    <DropdownMenu.Root>
                        <div className='edit-button-container'>
                            <DropdownMenu.Trigger class="edit-button note-icons-btn">
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
                    <form className='comment-editable' onSubmit={ handleEditCommentSubmit }>
                        <input type='text' className='comment-content editable' ref={ editCommentInputRef } />
                        
                            <button type='button' onClick={ () => setIsCommentEditable(false) }>
                                <MdCancel />
                            </button>

                            <button type='submit'>
                                <AiOutlineArrowUp />
                            </button>
                    </form>
                :
                    <p className='comment-content' >
                        { text }
                    </p>
            }
            
        </div>
    );
};

export default Comment;