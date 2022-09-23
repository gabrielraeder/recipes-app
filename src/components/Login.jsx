import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handerChange = (value, callback) => callback(value);

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
          type="text"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => (handerChange(value, setPassword)) }
        />
      </label>
      <button type="button" data-testid="login-submit-btn">
        Enter
      </button>
    </div>
  );
}
