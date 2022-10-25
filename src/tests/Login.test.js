import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

describe('verifica componente Login', () => {
  it('verifica componentes se inputs são renderizados', () => {
    render(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  it('verifica se botao enter é renderizado na tela', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeInTheDocument();
  });
  it('verifica  o caminho para página ', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });
  it('verifica os eventos de input e mudança de rota após clique no botão', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/'] });
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /enter/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(inputPassword).toHaveTextContent('');
    expect(inputEmail).toHaveTextContent('');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeEnabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
  });
});
