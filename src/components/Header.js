import React from 'react';
import { useMode } from '../contexts/ModeProvider';

const Header = () => {
    const { toggleEditMode, setUrl } = useMode();

    const handleUrlSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        setUrl(() => data.get('url'))
    }

    return (
        <header>
            <button onClick={ toggleEditMode }>Toggle Edit Mode</button>
            
            <form action="" onSubmit={ handleUrlSubmit }>
                <input type="text" placeholder='enter url' name='url' />
                <button>navigate to url</button>
            </form>
        </header>
    );
};

export default Header;