import React, { useRef } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

const NoteForm = ({ onSubmit, closeForm, defaultInputValue }) => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputRef.current.value);
        
        // reset input after submit
        inputRef.current.value = '';
        closeForm?.();
    };
    
    return (
        <>
            <form onSubmit={ handleSubmit }>
                <input
                    ref={ inputRef }
                    type='text'
                    placeholder='Add a comment'
                    defaultValue={ defaultInputValue }
                />

                {
                    closeForm && (
                        <button className='cancel-button' type='button' onClick={ closeForm }>
                            <RxCross1 color='#fff' />
                        </button>
                    )
                }

                <button type='submit'>
                    <AiOutlineArrowUp />
                </button>
            </form>
        </>
    );
};

export default NoteForm;
