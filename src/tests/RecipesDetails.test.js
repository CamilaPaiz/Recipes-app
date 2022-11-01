import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWith';

describe('Verifica o Recipe Details', () => {
  const entrie = ['/drinks/12776'];
  const entrieMeals = ['/meals/52777'];
  const idPhoto = 'recipe-photo';
  const stringEntrie = '/drinks/12776';

  it('Ao clicar no start recipe drinks muda para a pagina recipe in progress', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: entrie });
    const buttonStartRecipe = await screen.findByRole('button', { name: /start recipe/i });
    expect(buttonStartRecipe).toBeInTheDocument();
    userEvent.click(buttonStartRecipe);
    expect(history.location.pathname).toBe('/drinks/12776/in-progress');
  });
  it('Ao clicar no start recipe meals muda para a pagina recipe in progress', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: entrieMeals });
    const buttonStartRecipe = await screen.findByRole('button', { name: /start recipe/i });
    expect(buttonStartRecipe).toBeInTheDocument();
    userEvent.click(buttonStartRecipe);
    expect(history.location.pathname).toBe('/meals/52777/in-progress');
  });
  /*  it('Ao clicar no start recipe drinks muda para a pagina recipe in progress', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: entrie });
    const buttonStartRecipe = await screen.findByRole('button', { name: /start recipe/i });
    expect(buttonStartRecipe).toBeInTheDocument();
    userEvent.click(buttonStartRecipe);
    expect(history.location.pathname).toBe('/drinks/12776/in-progress');
  }); */
  it('verifica se renderiza componentes drinks favorite na tela', async () => {
    renderWithRouter(<App />, { initialEntries: entrie });
    expect(await screen.findByTestId('recipe-title'));
  });
  it('verifica se renderiza componentes meals favorite na tela', async () => {
    renderWithRouter(<App />, { initialEntries: entrieMeals });
    expect(await screen.findByTestId('recipe-title'));
  });
  it('verifica se renderiza carousel meals na tela', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52777'] });
    expect(await screen.findAllByTestId(idPhoto));
  });
  it('verifica se renderiza carousel drinks  na tela', async () => {
    renderWithRouter(<App />, { initialEntries: entrie });
    expect(await screen.findAllByTestId(idPhoto));
    const recomendation = await screen.findByTestId(`${0}-recommendation-card`);
    const recomendation2 = await screen.findByTestId(`${1}-recommendation-card`);

    expect(recomendation).toBeInTheDocument();
    expect(recomendation2).toBeInTheDocument();
  });
  it('verifica se renderiza carousel meals  na tela', async () => {
    renderWithRouter(<App />, { initialEntries: entrieMeals });
    expect(await screen.findAllByTestId('recipe-photo'));
    const recomendation = await screen.findByTestId(`${0}-recommendation-card`);
    const recomendation2 = await screen.findByTestId(`${1}-recommendation-card`);

    expect(recomendation).toBeInTheDocument();
    expect(recomendation2).toBeInTheDocument();
  });

  it('verifica se renderiza botao share na tela', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/:id'] });
    const buttonshare = screen.getByRole('button', { name: /share/i });
    expect(buttonshare).toBeInTheDocument();
  });
  it('verifica se renderiza botao carousel meals na tela', async () => {
    renderWithRouter(<App />, { initialEntries: entrieMeals });
    const button = await screen.findByRole('button', { name: /⇒/i });
    expect(button).toBeInTheDocument();

    const recomendation = await screen.findByTestId(`${0}-recommendation-card`);
    const recomendation2 = await screen.findByTestId(`${1}-recommendation-card`);
    expect(recomendation).toBeInTheDocument();
    expect(recomendation2).toBeInTheDocument();
    userEvent.click(button);
    const recomendation3 = await screen.findByTestId(`${2}-recommendation-card`);
    const recomendation4 = await screen.findByTestId(`${3}-recommendation-card`);
    expect(recomendation3).toBeInTheDocument();
    expect(recomendation4).toBeInTheDocument();
  });
  it('verifica se renderiza botao carousel drinks na tela', async () => {
    renderWithRouter(<App />, { initialEntries: entrie });
    const button = await screen.findByRole('button', { name: /⇒/i });
    expect(button).toBeInTheDocument();

    const recomendation = await screen.findByTestId(`${0}-recommendation-card`);
    const recomendation2 = await screen.findByTestId(`${1}-recommendation-card`);
    expect(recomendation).toBeInTheDocument();
    expect(recomendation2).toBeInTheDocument();
    userEvent.click(button);
    const recomendation3 = await screen.findByTestId(`${2}-recommendation-card`);
    const recomendation4 = await screen.findByTestId(`${3}-recommendation-card`);
    expect(recomendation3).toBeInTheDocument();
    expect(recomendation4).toBeInTheDocument();
  });
  it('verifica se renderiza botao carousel drinks na tela para menos', async () => {
    renderWithRouter(<App />, { initialEntries: entrie });
    const button = await screen.findByRole('button', { name: /⇐/i });
    expect(button).toBeInTheDocument();

    const recomendation2 = await screen.findByTestId(`${2}-recommendation-card`);
    const recomendation3 = await screen.findByTestId(`${3}-recommendation-card`);
    expect(recomendation3).toBeInTheDocument();
    expect(recomendation2).toBeInTheDocument();
    userEvent.click(button);
    const recomendation1 = await screen.findByTestId(`${1}-recommendation-card`);
    const recomendation0 = await screen.findByTestId(`${0}-recommendation-card`);
    expect(recomendation1).toBeInTheDocument();
    expect(recomendation0).toBeInTheDocument();
  });
  it('verifica se renderiza botao carousel meals na tela para menos', async () => {
    renderWithRouter(<App />, { initialEntries: entrieMeals });
    const button = await screen.findByRole('button', { name: /⇐/i });
    expect(button).toBeInTheDocument();

    const recomendation2 = await screen.findByTestId(`${2}-recommendation-card`);
    const recomendation3 = await screen.findByTestId(`${3}-recommendation-card`);
    expect(recomendation3).toBeInTheDocument();
    expect(recomendation2).toBeInTheDocument();
    userEvent.click(button);
    const recomendation1 = await screen.findByTestId(`${1}-recommendation-card`);
    const recomendation0 = await screen.findByTestId(`${0}-recommendation-card`);
    expect(recomendation1).toBeInTheDocument();
    expect(recomendation0).toBeInTheDocument();
  });
});
