import React, { useRef } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

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
                        <button type='button' onClick={ closeForm }>
                            <MdCancel />
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
