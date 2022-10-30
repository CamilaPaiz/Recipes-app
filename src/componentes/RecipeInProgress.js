import React from 'react';
/* import { detailsIDMeals, detailsIDDrinks } from './RecipeDetails';
 */
export default function RecipeInProgress() {
  return (
    <div>
      <h2 data-testid="recipe-title">RecipeInProgress</h2>
      <img
        data-testid="recipe-photo"
        alt="imagem receita em progresso"
      />

      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">Category text</p>
      <p data-testid="instructions">Instructions</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}
