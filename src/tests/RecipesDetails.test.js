import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

describe('Verifica o Recipe Details', () => {
  it('Ao clicar no start recipe muda para a pagina recipe in progress', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks/:id'] });
    const buttonStartRecipe = screen.getByRole('button', { name: /start recipe/i });
    expect(buttonStartRecipe).toBeInTheDocument();
    userEvent.click(buttonStartRecipe);
    expect(history.location.pathname).toBe('/drinks/:id-da-receita/in-progress');
  });
  /*  it('verifica se renderiza botao favorite na tela', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks/:id'] });
    const buttonFavorite = screen.getByRole('button', { name: /favorite/i });
    expect(buttonFavorite).toBeInTheDocument();
  }); */
  it('verifica se renderiza botao share na tela', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/:id'] });
    const buttonshare = screen.getByRole('button', { name: /share/i });
    expect(buttonshare).toBeInTheDocument();
  });
});
