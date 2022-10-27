import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/recipesDetails.css';

export default function RecipeDetails() {
  const history = useHistory();
  const params = useParams();
  console.log(params.id);
  // const [detailsIDRecipe, setDetailsIDRecipe] = useState([]);
  const [detailsIDMeals, setDetailsIDMeals] = useState();
  const [detailsIDDrinks, setDetailsIDDrinks] = useState();

  const requestdetailsRecipe = async () => {
    let endpointdetailsId;
    if (history.location.pathname === '/meals') {
      endpointdetailsId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      console.log(endpointdetailsId);
    } else if (history.location.pathname === '/drinks') {
      endpointdetailsId = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    }
    const response = await fetch(endpointdetailsId);
    const result = await response.json();
    if (history.location.pathname === '/meals') {
      setDetailsIDMeals(result);
    } else if (history.location.pathname === '/drinks') {
      setDetailsIDDrinks(result);
    }
  };
  console.log(detailsIDMeals);
  useEffect(() => {
    requestdetailsRecipe();
  }, []);

  /* if (history.location.pathname === '/meals') {
    setDataCategoryMeals(result.meals.slice(0, CINCO));
    console.log(dataCategoryMeals);
  } else if (history.location.pathname === '/drinks') {
    setDataCategoryDrinks(result.drinks.slice(0, CINCO));
    console.log(dataCategoryDrinks);
  } */

  // console.log(detailsIDDrinks.idMeal);
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
