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
      setmealsRoute(true);
      setdrinkRoute(false);
    } else if (pathnameToCompare[1] === 'drinks') {
      setDetailsIDDrinks(result);
      setdrinkRoute(true);
      setmealsRoute(false);
    }
    console.log(detailsIDDrinks);
    console.log(detailsIDMeals);
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
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid="recipe-photo"
              style={ { width: '200px', height: '150px' } }
            />
            <h3 data-testid="recipe-title">{item.strMeal}</h3>
            <p data-testid="recipe-category">{item.strAlcoholic}</p>
            <p data-testid="instructions">{item.strInstructions}</p>

            <span>
              Ingredients:
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {item.strIngredient1}
                {item.strMeasure1}

              </p>
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {item.strIngredient2}

              </p>
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {item.strIngredient3}

              </p>
            </span>
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
            <span>
              Ingredients:
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {item.strIngredient1}

                {item.strMeasure1}

              </p>
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {item.strIngredient2}

              </p>
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {item.strIngredient3}

              </p>
            </span>
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
