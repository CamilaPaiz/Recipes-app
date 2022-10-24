import React from 'react';

export default function Login() {
  return (
    <div>
      <input
        data-testid="email-input"
        placeholder="E-mail"
      />

      <input
        data-testid="password-input"
        placeholder="Password"
      />

      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Enter
      </button>
    </div>
  );
}
