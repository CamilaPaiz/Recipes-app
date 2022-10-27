import React/* , { useEffect } */ from 'react';
import { useHistory } from 'react-router-dom';
import '../style/recipesDetails.css';

export default function RecipeDetails() {
  const history = useHistory();
  console.log(history.location.pathname);
  /* const requestRecipe = async () => {
    let endpointRecipe;
    if (history.location.pathname === '/meals') {
      endpointRecipe = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id - da - receita}`;
    } else if (history.location.pathname === '/drinks') {
      endpointRecipe = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id - da - receita}`;
    }
    const response = await fetch(endpointRecipe);
    const result = await response.json();
    return result;
  }; */

  /* useEffect(() => {
    requestRecipe();
  }, []); */

  return (
    <div>
      <h2 data-testid="recipe-title">Título receita</h2>
      <img data-testid="recipe-photo" alt="imagem receita" />
      <p data-testid="recipe-category">texto catergoria</p>
      {/*  <p data-testid="${index}-ingredient-name-and-measure">ingredientes</p> */}
      <p data-testid="instructions">texto instrução</p>
      <p data-testid="video" />
      <button
        className="recipesDetails"
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe

      </button>
    </div>
  );
}
