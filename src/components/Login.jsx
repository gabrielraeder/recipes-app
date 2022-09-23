import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    localStorage.setItem('user', JSON.stringify(userObj));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <div>
      <label htmlFor="email">
        E-mail:
        <input
          type="text"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => (handerChange(value, setEmail)) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => (handerChange(value, setPassword)) }
        />
      </label>
      <button
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
