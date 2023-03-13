import React from 'react';
import * as Popover from "@radix-ui/react-popover";

const Note = ({ noteDetails, noteDispatch }) => {
    const { id, coords, comments } = noteDetails;

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
            <Popover.Trigger
            className="note-pin pin"
            style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }}
            >
            </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content className="PopoverContent" side='right' sideOffset={ 80 }>
                    {
                        comments.map((comment) => {
                            const { text, time } = comment;

                            return (
                            <div  className='comment-container' key={ comment.id }>
                                <div className='comment-header'>
                                    <img src="https://i.pravatar.cc/300" alt="" />
                                    <strong>You</strong>
                                    <span className='date'>{ time }</span>
                                </div>
                                
                                <p className='comment-content'>
                                { text }
                                </p>
                            </div>
                            )
                        })
                    }

                    <form action="" onSubmit={ handleCommentSubmit }>
                        <input type="text" name='text'/>
                        <button>Send comment</button>
                    </form>
                    </Popover.Content>
                </Popover.Portal>
        </Popover.Root>
    );
};

export default Note;