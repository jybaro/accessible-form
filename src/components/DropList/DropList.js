import React, { useState, useEffect } from 'react'
import { ValidationMessage } from '../ValidationMessage/ValidationMessage';

import './DropList.scss';
import arrow from "./../../assets/text-expand-arrow.svg";

export const DropList = ({name, value, setValue, required, forceCheck, setForceCheck}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');
    const [focus, setFocus] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open);
    }
    const handleClickYes = (e) => {
        e.preventDefault();
        setValue('Yes');
        setOpen(false);
        checkValidation();
    }
    const handleClickNo = (e) => {
        e.preventDefault();
        setValue('No');
        setOpen(false);
        checkValidation();
    }
    const handleFocus = () => {
        setFocus(true);
    }
    const handleBlur = () => {
        setFocus(false);
    }
  
    const checkValidation = () => {
        setError(false);
        if (required && value === '') {
            setMsg(name + ' is required')
            setError(true);
        }
    }
    useEffect(() => {
        checkValidation();
    });

    return (
        <div className="DropList">
            <ValidationMessage  msg={msg} error={error} />

            <label>{ name + (required ? '*' : '')}
                <div 
                    onClick={ handleClick }
                    className={"DropList__container " + (focus ? 'DropList__container--focus' : '')}
                >
                    <div className="DropList__head">
                        <span>{value === '' ? '- SELECT ONE -' : value}</span>
                        <button 
                            className={"DropList__arrow " + (open ? "DropList__arrow--rotate" : "")} 
                            onClick={ handleClick }
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            >
                            <img src={arrow}  />
                        </button>
                    </div>
                    {open && <div className="DropList__body">
                        <button 
                            className={'DropList__option ' + (value === 'Yes' ? 'DropList__option--selected ' : '')}
                            onClick={handleClickYes}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            >Yes</button>
                        <button 
                            className={'DropList__option ' + (value === 'No' ? 'DropList__option--selected ' : '')}
                            onClick={handleClickNo}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            >No</button>
                        </div>
                    }
                </div>
            </label>

        </div>
    )
}
