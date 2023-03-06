import React, { useRef, useState } from 'react';
import { useMode } from '../context/ModeProvider';

const Page = () => {
    const pageRef = useRef(null);
    const { url, editMode } = useMode();

    return (
        <div className='page-wrapper' ref={ pageRef }>
            <iframe src={ url } frameBorder="0"></iframe>
            {
                editMode ?
                <div className="overlay"></div>
                :
                null
            }
        </div>
    );
};

export default Page;