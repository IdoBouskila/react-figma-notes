import React, { useRef } from 'react';
import { useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

const NoteForm = ({ onSubmit, onCancel, defaultInputValue }) => {
    const inputRef = useRef(null);
    const [isDirty, setIsDirty] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputRef.current.value === '') {
            return;
        }

        onSubmit(inputRef.current.value);
        
        // reset input after submit
        inputRef.current.value = '';
        setIsDirty(false);
    };
    
    return (
        <>
            <form onSubmit={ handleSubmit }>
                <input
                    ref={ inputRef }
                    type='text'
                    placeholder='Add a comment'
                    defaultValue={ defaultInputValue }
                    onChange={ (e) => setIsDirty( e.target.value !== e.target.defaultValue ) }
                />

                {
                    onCancel && (
                        <button className='cancel-button' type='button' onClick={ onCancel }>
                            <RxCross1 color='#fff' />
                        </button>
                    )
                }

                <button type='submit' className={ isDirty ? 'active' : '' }>
                    <AiOutlineArrowUp />
                </button>
            </form>
        </>
    );
};

export default NoteForm;
