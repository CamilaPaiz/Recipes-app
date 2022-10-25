import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

describe('verifica componente Login', () => {
  it('verifica componentes se inputs são renderizados', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  it('verifica se botao enter é renderizado na tela', () => {
    renderWithRouter(<App />);
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

describe('Verifica o Header', () => {
  it('Verifica a renderização', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const buttonProfile = screen.getByRole('button', { name: 'Perfil' });
    const buttonInput = screen.getByRole('button', { name: 'Pesquisar' });
    const titulo = screen.getByText('Meals');
    expect(titulo).toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();
  });
  it('Verifica os buttons', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const buttonProfile = screen.getByRole('button', { name: 'Perfil' });
    const buttonInput = screen.getByRole('button', { name: 'Pesquisar' });
    userEvent.click(buttonInput);
    const input = screen.getByPlaceholderText('Procure');
    expect(input).toBeInTheDocument();
    userEvent.click(buttonInput);
    expect(input).not.toBeInTheDocument();
    expect(buttonProfile).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();
    userEvent.click(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
  });
  it('Verifica os buttons', () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    const titulo = screen.getByText('Done Recipes');
    expect(titulo).toBeInTheDocument();
  });
});
