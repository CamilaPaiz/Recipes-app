import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

const entrie = ['/drinks/12776'];
const entrieMeals = ['/meals/52777'];
/* const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
}); */

describe('verifica tela Recipe In Progress', () => {
  it('verifica renderização de botões', async () => {
    /*  const localStorage = [{ alcoholicOrNot: 'Non alcoholic',
      category: 'Coffee / Tea',
      doneDate: '2022-11-03T14:42:45.705Z',
      id: '12776',
      image: 'https://www.thecocktaildb.com/images/media/drink/xwtptq1441247579.jpg',
      name: 'Melya',
      nationality: '',
      tags: [],
      type: 'drink',
    }]; */

    /* await signOutUser(); */

    /*  expect(spyLoStoRemove).toHaveBeenCalled();
    expect(spyLoStoRemove).toHaveBeenCalledTimes(2); */

    const { history } = renderWithRouter(<App />, { initialEntries: entrie });
    const button = await screen.findByTestId('favorite-btn');
    expect(button).toBeInTheDocument();
    const btnstart = await screen.findByTestId('start-recipe-btn');
    expect(btnstart).toBeInTheDocument();
    userEvent.click(btnstart);
    const btn = await screen.findByTestId('finish-recipe-btn');
    expect(btn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/12776/in-progress');
    const checkbox0 = await screen.findByTestId('0-ingredient-step');
    const checkbox1 = await screen.findByTestId('1-ingredient-step');
    const checkbox2 = await screen.findByTestId('2-ingredient-step');
    /*  expect(btn).toBeDisabled(); */
    userEvent.click(checkbox0);
    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    expect(btn).toBeEnabled();
    userEvent.click(btn);
    const btnPerfil = await screen.findByTestId('profile-top-btn');
    expect(btnPerfil).toBeInTheDocument();
    /*  const local = jest.spyOn(window.localStorage, 'setItem');
    expect(local).toHaveBeenCalled();
    expect(local).toHaveBeenCalledTimes(1); */
    expect(history.location.pathname).toBe('/done-recipes');
    /* expect(localStorage).toHaveBeenCalledTimes(1); */
  });
  it('verifica renderização de botões', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: entrieMeals });
    const button = await screen.findByTestId('favorite-btn');
    expect(button).toBeInTheDocument();
    const btnstart = await screen.findByTestId('start-recipe-btn');
    expect(btnstart).toBeInTheDocument();
    userEvent.click(btnstart);
    const btn = await screen.findByTestId('finish-recipe-btn');
    expect(btn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals/52777/in-progress');
    /*  expect(btn).toBeDisabled(); */
    const checkbox0 = await screen.findByTestId('0-ingredient-step');
    const checkbox1 = await screen.findByTestId('1-ingredient-step');
    const checkbox2 = await screen.findByTestId('2-ingredient-step');
    const checkbox3 = await screen.findByTestId('3-ingredient-step');
    const checkbox4 = await screen.findByTestId('4-ingredient-step');
    const checkbox5 = await screen.findByTestId('5-ingredient-step');
    const checkbox6 = await screen.findByTestId('6-ingredient-step');
    const checkbox7 = await screen.findByTestId('7-ingredient-step');
    const checkbox8 = await screen.findByTestId('8-ingredient-step');
    userEvent.click(checkbox0);
    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);
    userEvent.click(checkbox4);
    userEvent.click(checkbox5);
    userEvent.click(checkbox6);
    userEvent.click(checkbox7);
    userEvent.click(checkbox8);
    expect(btn).toBeEnabled();
    userEvent.click(btn);
    const btnPerfil = await screen.findByTestId('profile-top-btn');
    expect(btnPerfil).toBeInTheDocument();
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
