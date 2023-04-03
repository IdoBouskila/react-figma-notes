import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { toggleNoteMode } from '../redux/notesSettings';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <header>
            <label htmlFor='note-mode'>Note Mode</label>

            <Switch.Root
                onClick={ () => dispatch(toggleNoteMode()) }
                className='toggle'
                id='note-mode'
            >
                <Switch.Thumb className='switch-thumb' />
            </Switch.Root>
        </header>
    );
};

export default Header;
