import React, { useState, useEffect } from 'react'
import { Checkbox} from '../Checkbox/Checkbox';
import { ValidationMessage } from '../ValidationMessage/ValidationMessage';
import './Checkgroup.scss';

export const Checkgroup = ({elements, forceCheck, setForceCheck}) => {
    const [error, setError] = useState(false);
    const checkValidation = () => {
        let localError = true;
        elements.forEach(element => {
            if (element.value) {
                localError = false;
            }
        });
        setError(localError);
    }
    if (forceCheck) {
        checkValidation();
        setForceCheck(false);
    }

    useEffect(() => {
        checkValidation();
    });

    return (
        <div className='Checkgroup'>
            <ValidationMessage msg="At least one option is required" error={error} />
            {elements.map((element) => 
                <Checkbox 
                    key={element.name} 
                    name={element.name} 
                    value={element.value} 
                    setValue={ element.setValue }
                    checkValidation = {checkValidation}
                />
            )}
        </div>
    )
}
