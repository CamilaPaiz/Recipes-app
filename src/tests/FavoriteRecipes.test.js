import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

describe('Verifica o Footer', () => {
  it('Ao clicar no meals muda para a pagina do meals', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');
  });
  it('Ao clicar no drinks muda para a pagina do drinks', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    expect(history.location.pathname).toBe('/drinks');
  });
});
