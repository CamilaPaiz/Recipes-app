import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

export default function Login() {
  const { email,
    password,
    handleEmail,
    handlePassword,
    handleClick,
    isDisabled,
  } = useContext(RecipeContext);

  return (
    <div>
      <input
        data-testid="email-input"
        placeholder="E-mail"
        value={ email }
        onChange={ handleEmail }
      />

      <input
        data-testid="password-input"
        placeholder="Password"
        value={ password }
        onChange={ handlePassword }
      />

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}
