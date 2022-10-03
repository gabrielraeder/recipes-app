import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/Login.css';
import recipeApp from '../images/recipeApp.png';
import { saveToLocalStorage } from '../services/localStorage';

const PASSWORD_LENGTH = 7;

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handerChange = (value, callback) => callback(value);

  const validateEmail = (e) => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]/;
    return regex.test(e);
  };

  const validatePassword = (pword) => pword.length >= PASSWORD_LENGTH;

  const validateButton = () => validateEmail(email) && validatePassword(password);

  const handleSubmit = () => {
    const userObj = { email };
    saveToLocalStorage('user', userObj);
    saveToLocalStorage('mealsToken', 1);
    saveToLocalStorage('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <div className="loginContainer">
      <img className="recipeLogo" src={ recipeApp } alt="recipeApp logo" />
      <input
        className="email"
        placeholder="E-mail"
        type="text"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target: { value } }) => (handerChange(value, setEmail)) }
      />
      <input
        className="password"
        placeholder="Senha"
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ ({ target: { value } }) => (handerChange(value, setPassword)) }
      />
      <button
        className="loginBtn"
        type="button"
        data-testid="login-submit-btn"
        disabled={ !validateButton() }
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </div>
  );
}
