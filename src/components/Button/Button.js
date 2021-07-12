import React from 'react'

import './Button.scss';

export const Button = ({name, handler}) => {
    const handleClick = (e) => {
        if (handler) {
            e.preventDefault();
            handler();
        }
    };
    return (
        <button className={ "button " + (handler ? 'button--secondary' : 'button--primary') } onClick={handleClick}>
            {name}
        </button>
    )
}
