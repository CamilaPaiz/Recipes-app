import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

const beefCategory = 'Beef-category-filter';
const BreakCate = 'Breakfast-category-filter';
const un = undefined;
const Img0 = '0-card-img';
const desert = 'Dessert-category-filter';
const urlDrink = '/drinks/15997';
describe('Testes no recipes', () => {
  it('Se acha os botoes depois da api', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const newPath = '/meals/52977';
    const buttonBeef = await screen.findByTestId(beefCategory, un, { timeout: 3000 });
    const Breakfast = await screen.findByTestId(BreakCate, undefined, { timeout: 3000 });
    const Chicken = await screen.findByTestId('Chicken-category-filter', undefined, { timeout: 3000 });
    const Dessert = await screen.findByTestId(desert, undefined, { timeout: 3000 });
    const Goat = await screen.findByTestId('Goat-category-filter', undefined, { timeout: 3000 });
    const mealsPadrao = await screen.findAllByTestId('MealsPadrao', undefined, { timeout: 3000 });
    expect(mealsPadrao[0]).toBeInTheDocument();
    expect(buttonBeef).toBeInTheDocument();
    expect(Breakfast).toBeInTheDocument();
    expect(Chicken).toBeInTheDocument();
    expect(Dessert).toBeInTheDocument();
    expect(Goat).toBeInTheDocument();
    userEvent.click(buttonBeef);
    const BeefAndMustard = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(BeefAndMustard).toBeInTheDocument();
    userEvent.click(BeefAndMustard);
    expect(history.location.pathname).toBe(newPath);
  });
  it('Se acha os botoes depois da api no drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const buttonOrdi = await screen.findByTestId('Ordinary Drink-category-filter', undefined, { timeout: 3000 });
    const Cocktail = await screen.findByTestId('Cocktail-category-filter', undefined, { timeout: 3000 });
    const Shake = await screen.findByTestId('Shake-category-filter', undefined, { timeout: 3000 });
    const Other = await screen.findByTestId('Other/Unknown-category-filter', undefined, { timeout: 3000 });
    const Cocoa = await screen.findByTestId('Cocoa-category-filter', undefined, { timeout: 3000 });
    const DrinksPadrao = await screen.findAllByTestId('DrinkPadrao', undefined, { timeout: 3000 });
    expect(DrinksPadrao[0]).toBeInTheDocument();
    expect(buttonOrdi).toBeInTheDocument();
    expect(Cocktail).toBeInTheDocument();
    expect(Shake).toBeInTheDocument();
    expect(Other).toBeInTheDocument();
    expect(Cocoa).toBeInTheDocument();
    userEvent.click(buttonOrdi);
    const MileLong = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(MileLong).toBeInTheDocument();
    userEvent.click(MileLong);
    expect(history.location.pathname).toBe(urlDrink);
  });
});
describe('Outros testes', () => {
  it('Click button All', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const buttonOrdi = await screen.findByTestId('Ordinary Drink-category-filter', undefined, { timeout: 3000 });
    const buttonAll = screen.getByTestId('All-category-filter');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonOrdi).toBeInTheDocument();
    userEvent.click(buttonOrdi);
    const MileLong = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(MileLong).toBeInTheDocument();
    userEvent.click(buttonAll);
    const GG = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(GG).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(GG).toBeInTheDocument();
  });
});
describe('Clicar em todos os filtros', () => {
  it('No meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const buttonBeef = await screen.findByTestId(beefCategory, un, { timeout: 3000 });
    const Breakfast = await screen.findByTestId(BreakCate, undefined, { timeout: 3000 });
    const Chicken = await screen.findByTestId('Chicken-category-filter', undefined, { timeout: 3000 });
    const Dessert = await screen.findByTestId(desert, undefined, { timeout: 3000 });
    const Goat = await screen.findByTestId('Goat-category-filter', undefined, { timeout: 3000 });
    userEvent.click(buttonBeef);
    const ImgBeef = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(ImgBeef).toBeInTheDocument();
    userEvent.click(Breakfast);
    const ImgBreaksfast = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(ImgBreaksfast).toBeInTheDocument();
    userEvent.click(Chicken);
    const ImgChicken = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(ImgChicken).toBeInTheDocument();
    userEvent.click(Dessert);
    const ImgDesert = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(ImgDesert).toBeInTheDocument();
    userEvent.click(Goat);
    const ImgGoat = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(ImgGoat).toBeInTheDocument();
  });
  it('Outros', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const MileLong = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(MileLong).toBeInTheDocument();
    userEvent.click(MileLong);
    expect(history.location.pathname).toBe(urlDrink);
  });
  it('Outross Meals', async () => {
    const path = '/meals/52977';
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const buttonBreak = await screen.findByTestId(BreakCate, un, { timeout: 3000 });
    expect(buttonBreak).toBeInTheDocument();
    userEvent.click(buttonBreak);
    const Beef = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(Beef).toBeInTheDocument();
    userEvent.click(Beef);
    expect(history.location.pathname).toBe(path);
  });
  it('Outros Drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const buttonShake = await screen.findByTestId('Shake-category-filter', un, { timeout: 3000 });
    expect(buttonShake).toBeInTheDocument();
    userEvent.click(buttonShake);
    const Florida = await screen.findByTestId('3-recipe-card', undefined, { timeout: 3000 });
    expect(Florida).toBeInTheDocument();
    userEvent.click(Florida);
    expect(history.location.pathname).toBe('/drinks/17203');
  });
  it('Outros Meals ', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const buttonDessert = await screen.findByTestId(desert, un, { timeout: 3000 });
    expect(buttonDessert).toBeInTheDocument();
    userEvent.click(buttonDessert);
    const Florida = await screen.findByTestId('1-recipe-card', undefined, { timeout: 3000 });
    expect(Florida).toBeInTheDocument();
    userEvent.click(Florida);
    expect(history.location.pathname).toBe('/meals/53060');
  });
  it('Outros Meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const buttonDessert = await screen.findByTestId('Dessert-category-filter', un, { timeout: 3000 });
    expect(buttonDessert).toBeInTheDocument();
    userEvent.click(buttonDessert);
    const Florida = await screen.findByTestId('1-recipe-card', undefined, { timeout: 3000 });
    expect(Florida).toBeInTheDocument();
    userEvent.click(buttonDessert);
    const Outro = await screen.findByTestId('0-recipe-card', undefined, { timeout: 3000 });
    expect(Outro).toBeInTheDocument();
  });
  it('verifica renderização de elementos da Api em m eals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const path = '/meals/52977';
    const corba = await screen.findByRole('img', { name: /corba/i });
    expect(corba).toBeInTheDocument();
    userEvent.click(corba);
    expect(history.location.pathname).toBe(path);
  });
  it('verifica renderização de elementos da Api em drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const image = await screen.findByRole('img', { name: /gg/i });
    expect(image).toBeInTheDocument();
    userEvent.click(image);
    expect(history.location.pathname).toBe('/drinks/15997');
  });
  it('verifica renderização de elementos da Api em drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const card = await screen.findAllByTestId(/-recipe-card/i);
    expect(card).toHaveLength(12);
  });
  it('verifica renderização de elementos da Api em meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const card = await screen.findAllByTestId(/-recipe-card/i);
    expect(card).toHaveLength(12);
  });
  it('verifica click breaksfast', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const buttonBreakfast = await screen.findByTestId('Breakfast-category-filter');
    expect(buttonBreakfast).toBeInTheDocument();
    userEvent.click(buttonBreakfast);
    const newImage = await screen.findByRole('img', { name: /breakfast potatoes/i });
    expect(newImage).toBeInTheDocument();
  });
  /* it('verifica click beef', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const button = await screen.findByTestId('Beef-category-filter');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const newImage = await screen.findByTestId(/-card-img/i);
    expect(newImage).toHaveLength(12);
  }); */
  /* it('verifica click shake', async () => {
    const filter = 'Shake-category-filter';
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const button = await screen.findByTestId(filter);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const newImage = await screen.findByTestId(/-card-img/i);
    expect(newImage).toHaveLength(12);
  }); */
  /*  it('verifica click drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const filter = await screen.findByTestId(/-card-img/i);

    expect(filter).toBeInTheDocument();
    userEvent.click(filter);
    expect(history.location.pathname).toBe('/drinks/:id');
  }); */
});
