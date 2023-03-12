import React from 'react';

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
        <div className='note' style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }}>
            {
                comments.map((comment) => {
                    const { text, time } = comment;

                    return (
                        <div className='comment-container' key={ comment.id }>
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
        </div>
    );
};

export default Note;