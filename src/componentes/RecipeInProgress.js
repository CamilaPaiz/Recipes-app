import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/recipeInProgress.css';
// import RecipeContext from '../context/RecipeContext';
/* import { detailsIDMeals, detailsIDDrinks } from './RecipeDetails';
 */
export default function RecipeInProgress() {
  let edId;
  const arrayIngredients = [];
  const riscar = ({ target }) => {
    const { parentNode } = target;
    if (parentNode.children[0].className === ''
     || parentNode.children[0].className === 'desrasbicar') {
      parentNode.children[0].className = 'riscar';
    } else {
      parentNode.children[0].className = 'desrasbicar';
    }
    console.log(parentNode.children[0].className);
  };
  const history = useHistory();
  const local = history.location.pathname;
  const mealss = local.includes('meals');
  const id = local.replace(/[^0-9]/g, '');
  console.log(id);
  const drinks = local.includes('drinks');
  const [apis, setApis] = useState();
  const array = () => {
    // }
    let ingredients;
    if (mealss) {
      ingredients = Object.entries(apis.meals[0])
        .filter((a) => a[0].includes('strIngredient'));
    } else {
      ingredients = Object.entries(apis.drinks[0])
        .filter((a) => a[0].includes('strIngredient'));
    }
    const a = ingredients.map((
      e,
    ) => e.slice(1)).filter((b) => b[0] !== '' && b[0] !== null);
    arrayIngredients.push(a);
  };
  if (apis !== undefined) {
    array();
  }
  const api = async () => {
    if (mealss) edId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    else if (drinks) edId = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(edId);
    const result = await response.json();
    setApis(result);
    // array();
  };
  console.log(arrayIngredients);
  useEffect(() => {
    api();
  }, []);
  console.log(apis);

  return (
    <div>
      {apis !== undefined ? (
        <div>
          {mealss && (
            <div>
              <h2
                data-testid="recipe-title"
              >
                { apis.meals[0].strMeal }
              </h2>
              <img
                src={ apis.meals[0].strMealThumb }
                data-testid="recipe-photo"
                alt="imagem receita em progresso"
              />
              <button type="button" data-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Favorite</button>
              <p data-testid="recipe-category">{ apis.meals[0].strCategory }</p>
              <p
                data-testid="instructions"
              >
                { apis.meals[0].strInstructions }
              </p>
              <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
              <br />
              {/* {arrayIngredients.map((ele, index) => {
                return (
                  <div key={ index }>
                    {apis.meals[0][i] !== '' && apis.meals[0][i] !== null && (
                      <label
                        htmlFor="ks"
                        data-testid={ `${index}-ingredient-step` }
                      >
                        <h2>{apis.meals[0][i]}</h2>
                        <input type="checkbox" />
                      </label>
                    )}
                  </div>
                );
              })} */}
              {/* {
                const i = 'strIngredient';
              } */}
              {arrayIngredients[0].map((element, index) => (
                <label
                  key={ index }
                  htmlFor="sa"
                  data-testid={ `${index}-ingredient-step` }
                >
                  <h2>{element[0]}</h2>
                  <input
                    type="checkbox"
                    // onClick={ riscar }
                  />
                </label>
              ))}
            </div>
          )}
          {drinks && (
            <div>
              <h2
                data-testid="recipe-title"
              >
                { apis.drinks[0].strDrink }
              </h2>
              <img
                src={ apis.drinks[0].strDrinkThumb }
                data-testid="recipe-photo"
                alt="imagem receita em progresso"
              />
              <button type="button" data-testid="share-btn">Share</button>
              <button type="button" data-testid="favorite-btn">Favorite</button>
              <p data-testid="recipe-category">{ apis.drinks[0].strCategory }</p>
              <p
                data-testid="instructions"
              >
                { apis.drinks[0].strInstructions }
              </p>
              <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
              <br />
              {arrayIngredients[0].map((element, index) => (
                <label
                  key={ index }
                  htmlFor="sass"
                  data-testid={ `${index}-ingredient-step` }
                >
                  <h2>{element[0]}</h2>
                  <input
                    type="checkbox"
                    onClick={ riscar }
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
