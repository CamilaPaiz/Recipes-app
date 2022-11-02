import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/recipeInProgress.css';
import ButtonShareFavorite from './ButtonShareFavorite';

export default function RecipeInProgress() {
  let edId;
  const mil = 1000;
  const arrayIngredients = [];
  const history = useHistory();
  const local = history.location.pathname;
  const mealss = local.includes('meals');
  const id = local.replace(/[^0-9]/g, '');
  const drinks = local.includes('drinks');
  const [apis, setApis] = useState();
  const [bool, setBool] = useState([]);
  const [stringIngredients, setStringIngredients] = useState('');

  const verificarCheckbox = () => {
    const ab = document.querySelectorAll('label');
    for (let index = 0; index < ab.length; index += 1) {
      if (ab[index].innerHTML.includes('checked')) {
        const teste = [];
        teste.push('true');
        setBool(teste);
      } else {
        const test = [];
        test.push('false');
        setBool(test);
      }
    }
  };
  setTimeout(verificarCheckbox, mil);
  const pegarDoLocal = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const localS = localStorage.getItem('inProgressRecipes');
      if (localS[0] === ',') {
        localS.substring(1);
        const a = localS.substring(1);
        setStringIngredients(a);
      } else {
        setStringIngredients(localS);
      }
    }
  };
  /* const copiarTexto = ({ target }) => {
    const text = target.parentNode.children[1].src;
    navigator.clipboard.writeText(text);
    setCopy(true);
  }; */
  const riscar = ({ target }) => {
    let a;
    if (stringIngredients !== '') {
      a = stringIngredients;
    }
    const text = target.parentNode.children[0].textContent;
    const adicionarText = `${a},${text}`;
    setStringIngredients(adicionarText);
    localStorage.setItem('inProgressRecipes', adicionarText);
  };

  const concluir = () => {
    const c = (mealss) ? 'meals' : 'drinks';
    const as = [];
    const obj = JSON.parse(localStorage.getItem('doneRecipes')) || as;
    const a = obj;
    console.log(apis[c][0]);
    if (mealss) {
      a.push({ id: apis[c][0].idMeal,
        nationality: apis[c][0].strArea || '',
        name: apis[c][0].strMeal,
        category: apis[c][0].strCategory,
        image: apis[c][0].strMealThumb,
        tags: [apis[c][0].strTags] || [],
        alcoholicOrNot: apis[c][0].strMealAlternate || '',
        type: 'meal',
        doneDate: '',
      });
    } else if (drinks) {
      a.push({ id: apis[c][0].idDrink,
        nationality: apis[c][0].strArea || '',
        name: apis[c][0].strDrink,
        category: apis[c][0].strCategory,
        image: apis[c][0].strDrinkThumb,
        tags: [apis[c][0].strTags] || [],
        alcoholicOrNot: apis[c][0].strDrinkAlternate || '',
        type: 'drink',
        doneDate: '',
      });
    }
    localStorage.setItem('doneRecipes', JSON.stringify(a));
    history.push('/done-recipes');
  };

  const array = () => {
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
  };
  useEffect(() => {
    api();
    pegarDoLocal();
  }, []);

  return (
    <div>
      <ButtonShareFavorite />
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
              <p data-testid="recipe-category">{ apis.meals[0].strCategory }</p>
              <p
                data-testid="instructions"
              >
                { apis.meals[0].strInstructions }
              </p>
              <button
                disabled={ !!bool.includes('false') }
                type="button"
                data-testid="finish-recipe-btn"
                onClick={ concluir }
              >
                Finish Recipe

              </button>
              <br />
              {arrayIngredients[0].map((element, index) => (
                <label
                  key={ index }
                  htmlFor="sa"
                  data-testid={ `${index}-ingredient-step` }
                >
                  <h2
                    style={ { textDecoration: stringIngredients.includes(element[0])
                      ? 'line-through solid rgb(0, 0, 0)' : '' } }
                  >
                    {element[0]}
                  </h2>
                  <input
                    type="checkbox"
                    defaultChecked={ stringIngredients.includes(element[0]) }
                    onClick={ riscar }
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
              <p data-testid="recipe-category">{ apis.drinks[0].strCategory }</p>
              <p
                data-testid="instructions"
              >
                { apis.drinks[0].strInstructions }
              </p>
              <button
                disabled={ !!bool.includes('false') }
                type="button"
                data-testid="finish-recipe-btn"
                onClick={ concluir }
              >
                Finish Recipe
              </button>
              <br />
              {arrayIngredients[0].map((element, index) => (
                <label
                  key={ index }
                  htmlFor="sass"
                  data-testid={ `${index}-ingredient-step` }
                >
                  <h2
                    style={ { textDecoration: stringIngredients.includes(element[0])
                      ? 'line-through solid rgb(0, 0, 0)'
                      : 'none solid rgb(33, 37, 41)' } }
                  >
                    {element[0]}
                  </h2>
                  <input
                    type="checkbox"
                    defaultChecked={ stringIngredients.includes(element[0]) }
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
