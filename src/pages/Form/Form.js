import React, { useState } from 'react'
import { Button } from '../../components/Button/Button';
import { Checkgroup } from '../../components/Checkgroup/Checkgroup';

import { config } from '../../config';
import { Field } from '../../components/Field/Field';
import { DropList } from '../../components/DropList/DropList';

import './Form.scss';


export const Form = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");

    const [euResident, setEuResident] = useState("");

    const [advances, setAdvances] = useState(false);
    const [alerts, setAlerts] = useState(false);
    const [other, setOther] = useState(false);


    const [status, setStatus] = useState("");
    const [statusMessage, setStatusMessage] = useState("");


    const [forceCheck, setForceCheck] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };
    const submit = async () => {
        if (!checkAllValidations()) {
            let fieldName = [];
            if (advances) {
                fieldName.push('advances');
            }
            if (alerts) {
                fieldName.push('alerts');
            }
            if (other) {
                fieldName.push('other');
            }
            fieldName = fieldName.join(',');
            const response = await fetch(config.apiUrl, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    fieldName, 
                    advances,
                    alerts,
                    other,
                    firstName,
                    lastName,
                    euResident,
                    org
                }),
            });
            const data = await response.json();
            setStatus(data.status);
            setStatusMessage(data.message);    
        }
        // setForceCheck(false);
    }
    const reset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setOrg("");
        setEuResident("");
        setAdvances(false);
        setAlerts(false);
        setOther(false);
    }
    const validateEmail = (email) => {
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(email)) {
            return 'Email is invalid';
        }
    }

    const checkAllValidations = () => {
        // setForceCheck(true);
        let error = false;
        error = error || (firstName === "");
        error = error || (lastName === "");
        error = error || (email === "");
        error = error || (euResident === "");
        error = error || !(advances || alerts || other);
        
        error = error || validateEmail(email);
        
        return error;
    }
    return (
        <div className="form">
            <h2>Sign up for email updates</h2>
            { status === "" && 
            <>
                <p className="form__help-text">*Indicates Required Field</p>

                <form onSubmit={ handleSubmit }>
                    <div className="form__fields">
                        <Field name="First name" value={firstName} setValue={ setFirstName } required forceCheck={forceCheck} setForceCheck={setForceCheck} />
                        <Field name="Last name" value={lastName} setValue={ setLastName } required forceCheck={forceCheck} setForceCheck={setForceCheck}/>
                        <Field name="Email address" value={email} setValue={ setEmail } required validation={validateEmail} forceCheck={forceCheck}  setForceCheck={setForceCheck} />
                        <Field name="Organization" value={org} setValue={ setOrg }  forceCheck={forceCheck} setForceCheck={setForceCheck}  />
                        <DropList name="EU Resident" value={euResident} setValue={ setEuResident } required forceCheck={forceCheck} setForceCheck={setForceCheck}  />
                    </div>
                    <Checkgroup 
                        elements={[
                            {
                                name: 'Advances',
                                value: advances,
                                setValue: setAdvances
                            },
                            {
                                name: 'Alerts',
                                value: alerts,
                                setValue: setAlerts
                            },
                            {
                                name: 'Other communications',
                                value: other,
                                setValue: setOther
                            }
                        ]}
                        forceCheck={forceCheck}
                        setForceCheck={setForceCheck} 
                    />
                    <div className="form__actions">
                        <Button name="Submit" />
                        <Button name="Reset" handler={reset} />
                    </div>
                </form> 
                </>
            }
            { status === "success" && <div className="form--success">{ statusMessage }</div> }
            { status === "error" && <div className="form--error">{ statusMessage }</div> }

        </div>
    )
}
