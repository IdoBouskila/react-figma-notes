import React from 'react';
import * as Popover from "@radix-ui/react-popover";
import * as Portal from '@radix-ui/react-portal';
import { AiOutlineArrowUp, AiOutlineCheckCircle, AiOutlineDelete, AiOutlineFullscreenExit } from 'react-icons/ai';

const Note = ({ noteDetails, noteDispatch }) => {
    const { id, coords, comments, target_selector } = noteDetails;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        noteDispatch({
            type: 'comment_added',
            payload: {
                id,
                text: data.get('text')
            }
        });
        
        // reset form input
        data.delete('text');
    }

    return (
        <Popover.Root defaultOpen={ true }>
            <Portal.Root
                className='note'
                container={ document.querySelector(target_selector) }
                style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }}
            >
                <Popover.Trigger
                    className="note-pin pin"
                />
            </Portal.Root>

            <Popover.Portal>
                <Popover.Content className="note-container" side='right' sideOffset={ 20 }>
                    <div className="note-header">
                        <div className="buttons">
                            <a href="">
                                <AiOutlineCheckCircle />
                            </a>

                            <a href="">
                                <AiOutlineDelete />
                            </a>

                            <Popover.Close className='close-button' asChild>
                                <a href="">
                                    <AiOutlineFullscreenExit />
                                </a>
                            </Popover.Close>
                        </div>
                    </div>
                    
                    <div className="comments-container">
                        {
                            comments.map((comment) => {
                                const { text, time } = comment;

                                return (
                                <div  className='comment' key={ comment.id }>
                                    <div className='comment-header'>
                                        <img src="https://i.pravatar.cc/300" alt="" />
                                        <strong>Ido Bouskila</strong>
                                        <span className='date'>25 minutes ago</span>
                                    </div>
                                    
                                    <p className='comment-content'>
                                        { text }
                                    </p>
                                </div>
                                )
                            })
                        }
                    </div>

                <form action="" onSubmit={ handleCommentSubmit }>
                    <img src="https://i.pravatar.cc/300" alt="" />

                    <div className="form-buttons">
                        <input type="text" name="text" placeholder='Reply'/>
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

export default Note;