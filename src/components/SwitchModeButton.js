import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { selectIsNotMode, toggleNoteMode } from '../redux/notesSettings';
import { useDispatch, useSelector } from 'react-redux';

const SwitchModeButton = () => {
    const dispatch = useDispatch();
    const isNoteMode = useSelector(selectIsNotMode);
    
    return (
        <header>
            <label htmlFor='note-mode'>Note Mode</label>

            <Switch.Root
                checked={ isNoteMode }
                onClick={ () => dispatch(toggleNoteMode()) }
                className='toggle'
                id='note-mode'
            >
                <Switch.Thumb className='switch-thumb' />
            </Switch.Root>
        </header>
    );
};

export default SwitchModeButton;
