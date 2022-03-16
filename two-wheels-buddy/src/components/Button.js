import React from 'react';
import './Button.css';

function Button({ value, className }) {
    const handleClick = () => {
        console.log(`kliknuto`)
    }

    return (
        <>
            <button
                className={ className }
                onClick={ handleClick }
            >
                { value }
            </button>
        </>
    );
}

export default Button;