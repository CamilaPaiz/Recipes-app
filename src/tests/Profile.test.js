import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

describe('Verifica o Profile', () => {
  it('Ao clicar no done recipes muda para a pagina do done recipes', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const buttonDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    expect(buttonDoneRecipes).toBeInTheDocument();
    userEvent.click(buttonDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Ao clicar no favorite recipes muda para a pagina do favorite recipes', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const buttonFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    expect(buttonFavoriteRecipes).toBeInTheDocument();
    userEvent.click(buttonFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Ao clicar no logout muda para a pagina do Login', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const buttonLogout = screen.getByRole('button', { name: /logout/i });
    expect(buttonLogout).toBeInTheDocument();
    userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
  });
});
