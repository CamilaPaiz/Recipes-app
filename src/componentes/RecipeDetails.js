import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/recipesDetails.css';

export default function RecipeDetails() {
  const history = useHistory();
  const params = useParams();
  console.log(params.id);
  // const [detailsIDRecipe, setDetailsIDRecipe] = useState([]);
  const [detailsIDMeals, setDetailsIDMeals] = useState([]);
  const [detailsIDDrinks, setDetailsIDDrinks] = useState([]);
  /* const [drinkRoute, setdrinkRoute] = useState(false);
  const [mealsRoute, setmealsRoute] = useState(false); */

  const requestdetailsRecipe = async () => {
    let endpointdetailsId;
    const pathnameToCompare = history.location.pathname.split('/');
    if (pathnameToCompare[1] === 'meals') {
      endpointdetailsId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      /* setmealsRoute(true); */
    } else if (pathnameToCompare[1] === 'drinks') {
      endpointdetailsId = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
      /* setdrinkRoute(true); */
    }
    const response = await fetch(endpointdetailsId);
    const result = await response.json();
    if (pathnameToCompare[1] === 'meals') {
      setDetailsIDMeals(result);
    } else if (pathnameToCompare[1] === 'drinks') {
      setDetailsIDDrinks(result);
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
      {/* {
        (drinkRoute) && detailsIDDrinks.map((item, index) => (
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
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {item.strIngredient1}

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

          </div>
        ))
      } */}
      {/*  {
        (mealsRoute) && detailsIDMeals.map((item, index) => (
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
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {item.strIngredient1}

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
            <p>{item.strVideo}</p>

          </div>
        ))
      } */}
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
