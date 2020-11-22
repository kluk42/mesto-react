import React, { useEffect, useState } from 'react';

import Form from '../Form/Form';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import { authorize } from '../Auth/Auth';

const Authorization = ({ headerLinkSetter, onLogin, isLoggedIn }) => {
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ isPopupStatusOpen, setIsPopupStatusOpen ] = useState(false);
    const [ formValues, setFormValues ] = useState({
        email: '',
        password: '',
    });
    const [ errorMessage, setErrorMessage ] = useState('');
    

    useEffect(() => {
        console.log('bang')
        const link = {
            to: '/sign-up',
            linkText: 'Регистрация'
        }
        headerLinkSetter(link);
    }, []);

    const onChange = (evt) => {
        const {name, value} = evt.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const onSubmit = async (evt) => {
        evt.preventDefault();
        const response = await authorize(formValues);
        if (response.status !== 400) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            onLogin(formValues.email);
            setFormValues({
                ...formValues,
                email: '',
                password: '',
            });
        } 
        if (response.status === 400) {
            setErrorMessage('Не передано одно из полей');
            setIsSuccess(false);
            setIsPopupStatusOpen(true);
        }
        if (response.status === 400) {
            setErrorMessage('Пользователь с email не найден');
            setIsSuccess(false);
            setIsPopupStatusOpen(true);
        }
    } 

    const onClose = () => {
        setIsPopupStatusOpen(false);
        setFormValues({
            ...formValues,
            email: '',
            password: '',
        });
    }

    return (
        <>
            {isPopupStatusOpen && <InfoToolTip isSuccess={isSuccess} onClose={onClose} errorMessage={errorMessage}></InfoToolTip>}
            <Form header="Вход" btnText="Войти" name="authorization" onSubmit={onSubmit}>
                <fieldset className="logging-form__input-container">
                    <label htmlFor="name-input" className="logging-form__field">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            id="email-input" 
                            className="logging-form__input logging-form__input_content_email"
                            value={formValues.email}
                            onChange={onChange}
                            required
                        />
                        <span id="email-input-error"
                            className={`logging-form__input-error`}>
                        </span>
                    </label>
                    <label htmlFor="name-input" className="logging-form__field">
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            id="password-input" 
                            className="logging-form__input logging-form__input_content_password"
                            value={formValues.password}
                            onChange={onChange}
                            required
                        />
                        <span id="password-input-error"
                            className={`logging-form__input-error`}>
                        </span>
                    </label>
                </fieldset>
            </Form>
        </>
    )
}

export default Authorization;