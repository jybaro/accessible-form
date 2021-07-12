import React, { useState, useEffect } from 'react'
import { ValidationMessage } from '../ValidationMessage/ValidationMessage';

import './Field.scss';

export const Field = ({name, value, setValue, validation, required, forceCheck, setForceCheck}) => {
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');
    const handleChange = (e) => {

        setError(false);
        setValue(e.target.value);
        checkValidations();        
    }; 


    const checkValidations = () => {

        setError(false);
        if (validation ) {
            setMsg(validation(value));
            if (msg) {
                setError(true);
            } else {
            }
        } else {
        }

        if (required && value === '') {
            setError(true);
            setMsg(name + ' is required')
        }

    }
    useEffect(() => {
        checkValidations();
    });

    return (
        <div className="field">
            <ValidationMessage msg={msg} error={error} />
            <label>{ name + (required ? '*' : '')}
                <input
                    onChange={ handleChange }
                    onInput={ handleChange }
                    onBlur={ handleChange }
                    value={ value } 
                    className={'field__input' + (error ? ' field__input--error' : '')}
                ></input>
            </label>
        </div>
    )
}
