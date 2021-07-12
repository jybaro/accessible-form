import React, {useEffect} from 'react'
import check from "./../../assets/check.svg";

import './Checkbox.scss';

export const Checkbox = ({name, value, setValue, checkValidation}) => {
    const handleClick = (e) => {
        console.log('cambiando desde ' + value + ' hacia ' + (!value))
        setValue(!value);
        console.log('Nuevo valor, luego de enviar', value);

        e.preventDefault();

        
    }
    useEffect(() => {

        checkValidation()
       
    });
    return (
        <button className="checkbox" onClick={handleClick}>
            <label>
                {value 
                    ? <img className="checkbox--icon" src={check} />
                    : <span className="checkbox--unchecked" />
                }
                {name}
            </label>
        </button>
    )
}
