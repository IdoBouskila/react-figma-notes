import React from 'react';

const Note = ({ noteDetails }) => {
    const { coords, comments } = noteDetails;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className='note' style={{ transform: `translate3d(${ coords.x.size + coords.x.unit}, ${ coords.y.size + coords.y.unit }, 0)` }}>
            {
                comments.map((comment) => {
                    const { text, time } = comment;

                    return <div className='comment-container'>
                        <div className='comment-header'>
                            <img src="https://i.pravatar.cc/300" alt="" />
                            <strong>You</strong>
                            <span className='date'>{ time }</span>
                        </div>

                        <p className='comment-content'>
                            { text }
                        </p>
                    </div>
                })
            }

            <form action="" onSubmit={ handleCommentSubmit }>
                <input type="text" />
                <button>Send comment</button>
            </form>
        </div>
    );
};

export default Note;