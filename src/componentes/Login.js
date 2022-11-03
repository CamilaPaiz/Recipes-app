import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
/* import Header from './Header'; */
import '../style/login.css';

export default function Login() {
  const { email,
    password,
    handleEmail,
    handlePassword,
    handleClick,
    isDisabled,
  } = useContext(RecipeContext);

  return (
    <div className="login">
      {/*  <Header /> */}
      <h1 className="login-title">Login</h1>
      <input
        className="email"
        data-testid="email-input"
        placeholder="E-mail"
        value={ email }
        onChange={ handleEmail }
      />

      <input
        className="password"
        data-testid="password-input"
        placeholder="Password"
        value={ password }
        onChange={ handlePassword }
      />

      <button
        className="button"
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
