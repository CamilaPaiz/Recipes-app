import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

// it('teste o igual a', async () => {
//   render(<App />);
//   const select = screen.getByTestId('column-filter');
//   const selectOperador = screen.getByTestId('comparison-filter');
//   const inputValor = screen.getByTestId('value-filter');
//   const button = screen.getByRole('button', { name: 'Filtrar' })
//   expect(select).toBeInTheDocument();
//   expect(selectOperador).toBeInTheDocument();
//   expect(inputValor).toBeInTheDocument();
//   expect(button).toBeInTheDocument();
//   userEvent.selectOptions(select, ['rotation_period']);
//   userEvent.selectOptions(selectOperador, ['igual a']);
//   userEvent.type(inputValor, '27');
//   userEvent.click(button);
//   const todosPlanetas = await screen
//     .findAllByTestId('cadaPlaneta', undefined, { timeout: 3000 });
//   expect(todosPlanetas.length).toBe(10);
// })

const beefCategory = 'Beef-category-filter';
const BreakCate = 'Breakfast-category-filter';
const un = undefined;
const Img0 = '0-card-img';
const desert = 'Dessert-category-filter';
const urlDrink = '/drinks/15997';
describe('Testes no recipes', () => {
  it('Se acha os botoes depois da api', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
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
    expect(history.location.pathname).toBe('/meals/52874');
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
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const buttonBreak = await screen.findByTestId(BreakCate, un, { timeout: 3000 });
    expect(buttonBreak).toBeInTheDocument();
    userEvent.click(buttonBreak);
    const Beef = await screen.findByTestId(Img0, undefined, { timeout: 3000 });
    expect(Beef).toBeInTheDocument();
    userEvent.click(Beef);
    expect(history.location.pathname).toBe('/meals/52977');
  });
  it('Outros Drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const buttonShake = await screen.findByTestId('Shake-category-filter', un, { timeout: 3000 });
    expect(buttonShake).toBeInTheDocument();
    userEvent.click(buttonShake);
    const Florida = await screen.findByTestId('3-recipe-card', undefined, { timeout: 3000 });
    expect(Florida).toBeInTheDocument();
    userEvent.click(Florida);
    expect(history.location.pathname).toBe('/drinks/17222');
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
});
