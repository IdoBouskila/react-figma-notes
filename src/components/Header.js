import React, { useRef } from 'react';
import { useMode } from '../context/ModeProvider';

const Header = () => {
    const { toggleEditMode, setUrl } = useMode();
    const InputRef = useRef(null);

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        
        setUrl(() => InputRef.current.value)
    }

    return (
        <header>
            <button onClick={ toggleEditMode }>Toggle Edit Mode</button>
            
            <form action="" onSubmit={ handleUrlSubmit }>
                <input type="text" placeholder='enter url' ref={ InputRef } />
                <button>navigate to url</button>
            </form>
        </header>
    );
};

export default Header;