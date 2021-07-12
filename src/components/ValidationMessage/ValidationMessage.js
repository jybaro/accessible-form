import React from 'react'
import './ValidationMessage.scss';

export const ValidationMessage = ({msg, error}) => {
    return (
        <>
        {   error 
            ? <div className="ValidationMessage">
                {msg}
            </div>
            : <div  className="ValidationMessage">&nbsp;</div>
        }
        </>
    )
}
