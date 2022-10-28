import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/recipesDetails.css';

export default function RecipeDetails() {
  const history = useHistory();
  const params = useParams();

  const [detailsIDMeals, setDetailsIDMeals] = useState([]);
  const [detailsIDDrinks, setDetailsIDDrinks] = useState([]);
  const [drinkRoute, setdrinkRoute] = useState(false);
  const [mealsRoute, setmealsRoute] = useState(false);
  const [ingrediente, setIngrediente] = useState([]);
  const [measure, setMeasure] = useState([]);

  const requestdetailsRecipe = async () => {
    let endpointdetailsId;
    const pathnameToCompare = history.location.pathname.split('/');
    if (pathnameToCompare[1] === 'meals') {
      endpointdetailsId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    } else if (pathnameToCompare[1] === 'drinks') {
      endpointdetailsId = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    }
    const response = await fetch(endpointdetailsId);
    const result = await response.json();
    if (pathnameToCompare[1] === 'meals') {
      setDetailsIDMeals(result);
      const respondeApi = result.meals[0];
      const pegaIngrediente = Object.entries(respondeApi)
        .filter((ingred) => ingred[0].includes('strIngredient')
        && ingred[1] !== '' && ingred[1] !== null).map((ingred) => ingred[1]);
      const pegaMesure = Object.entries(respondeApi)
        .filter((mesure) => mesure[0].includes('strMeasure')
        && mesure[1] !== '' && mesure[1] !== null).map((mesure) => mesure[1]);
      console.log(pegaIngrediente);
      setIngrediente(pegaIngrediente);
      setMeasure(pegaMesure);
      setmealsRoute(true);
      setdrinkRoute(false);
    } else if (pathnameToCompare[1] === 'drinks') {
      setDetailsIDDrinks(result);
      const respondeApiD = result.drinks[0];
      const pegaIngredienteD = Object.entries(respondeApiD)
        .filter((ingred) => ingred[0].includes('strIngredient')
        && ingred[1] !== '' && ingred[1] !== null).map((ingred) => ingred[1]);
      setIngrediente(pegaIngredienteD);
      const pegaMesure = Object.entries(respondeApiD)
        .filter((mesure) => mesure[0].includes('strMeasure')
        && mesure[1] !== '' && mesure[1] !== null).map((mesure) => mesure[1]);
      setMeasure(pegaMesure);
      setdrinkRoute(true);
      setmealsRoute(false);
    }
  };

  useEffect(() => {
    requestdetailsRecipe();
  }, []);

  const handleClick = () => {
    const pathnameToCompare = history.location.pathname.split('/');
    if (pathnameToCompare[1] === 'meals') {
      history.push(`/meals/${params.id}/in-progress`);
    } else if (pathnameToCompare[1] === 'drinks') {
      history.push(`/drinks/${params.id}/in-progress`);
    }
  };

  return (
    <div>
      {
        drinkRoute && detailsIDDrinks.drinks.map((item, index) => (
          <div key={ index }>
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid="recipe-photo"
              style={ { width: '200px', height: '150px' } }
            />
            <h3 data-testid="recipe-title">{item.strDrink}</h3>
            <p data-testid="recipe-category">{item.strAlcoholic}</p>
            <p data-testid="instructions">{item.strInstructions}</p>
            <h3>Ingredients:</h3>
            { ingrediente.map((el, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                { el}
              </p>

            )) }
            <h3>Measures:</h3>
            {
              measure.map((e, i) => (
                <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  { e}
                </p>

              ))
            }
          </div>
        ))
      }

      {
        (mealsRoute) && detailsIDMeals.meals.map((item, index) => (

          <div key={ index }>
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid="recipe-photo"
              style={ { width: '200px', height: '150px' } }
            />
            <h3 data-testid="recipe-title">{item.strMeal}</h3>
            <p data-testid="recipe-category">{item.strCategory}</p>
            <p data-testid="instructions">{item.strInstructions}</p>
            <h3>Ingredients:</h3>
            { ingrediente.map((e, i) => (
              <p
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                { e}

              </p>
            )) }
            <h3>Measures:</h3>
            {
              measure.map((el, idx) => (
                <p
                  key={ idx }
                  data-testid={ `${idx}-ingredient-name-and-measure` }
                >
                  {el}

                </p>

              ))
            }
            <iframe
              width="420"
              height="315"
              src={ item.strYoutube }
              title={ item.strMeal }
              data-testid="video"
            />

          </div>
        ))
      }

      <button type="button" data-testid="favorite-btn">
        Favorite
      </button>
      <button type="button" data-testid="share-btn">
        Share
      </button>
      <button
        onClick={ handleClick }
        className="recipesDetails"
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe

      </button>
    </div>
  );
}
