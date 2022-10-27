/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function Recipes() {
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataCategoryMeals, setDataCategoryMeals] = useState([]);
  const [dataCategoryDrinks, setDataCategoryDrinks] = useState([]);
  const [mealsPorCategory, setMealsPorCategory] = useState([]);
  const [drinksPorCategory, setDrinksPorCategory] = useState([]);
  const [clickAll, setClickAll] = useState(false);
  const history = useHistory();
  const doze = 12;
  const CINCO = 5;
  const { redirecionarParaPaginaComId } = useContext(RecipeContext);

  const requestData = async () => {
    let endpoint;
    if (history.location.pathname === '/meals') {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else if (history.location.pathname === '/drinks') {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }
    const response = await fetch(endpoint);
    const result = await response.json();
    if (history.location.pathname === '/meals') {
      setDataMeals(result.meals.slice(0, doze));
    } else if (history.location.pathname === '/drinks') {
      setDataDrinks(result.drinks.slice(0, doze));
    }
  };

  const requestCategory = async () => {
    let endpointCategory;
    if (history.location.pathname === '/meals') {
      endpointCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    } else if (history.location.pathname === '/drinks') {
      endpointCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    }
    const response = await fetch(endpointCategory);
    const result = await response.json();
    if (history.location.pathname === '/meals') {
      setDataCategoryMeals(result.meals.slice(0, CINCO));
      console.log(dataCategoryMeals);
    } else if (history.location.pathname === '/drinks') {
      setDataCategoryDrinks(result.drinks.slice(0, CINCO));
      console.log(dataCategoryDrinks);
    }
  };

  const requestTodasCategorias = async () => {
    if (clickAll === false) {
      setClickAll(true);
      setMealsPorCategory([]);
      setDrinksPorCategory([]);
    } else {
      setMealsPorCategory([]);
      setDrinksPorCategory([]);
      setClickAll(false);
    }
  };

  const requestMealsPorCategory = async (category) => {
    let url;
    const localizacao = history.location.pathname;
    if (localizacao === '/meals') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    } else if (localizacao === '/drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    const response = await fetch(url);
    const result = await response.json();
    if (localizacao === '/drinks' && drinksPorCategory.length > 0
     && drinksPorCategory[0].strDrink === result.drinks[0].strDrink) {
      return setDrinksPorCategory([]);
    }
    if (localizacao === '/meals' && mealsPorCategory.length > 0
     && mealsPorCategory[0].strMeal === result.meals[0].strMeal) {
      return setMealsPorCategory([]);
    }
    if (localizacao === '/meals') {
      setMealsPorCategory(result.meals.slice(0, doze));
    } else if (localizacao === '/drinks') {
      setDrinksPorCategory(result.drinks.slice(0, doze));
    }
  };

  useEffect(() => { requestData(); requestCategory(); }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ requestTodasCategorias }
      >
        All
      </button>
      {
        (history.location.pathname === '/meals') && (dataCategoryMeals.map((e, indx) => (
          <div key={ indx }>
            <button
              type="button"
              onClick={ () => { requestMealsPorCategory(e.strCategory); } }
              data-testid={ `${e.strCategory}-category-filter` }
            >
              {e.strCategory}
            </button>
          </div>
        )))
      }
      { (history.location.pathname === '/meals')
       && (mealsPorCategory.length === 0)
        && (dataMeals.map((item, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClickCapture={ () => redirecionarParaPaginaComId(dataMeals[index].idMeal) }
          >
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid={ `${index}-card-img` }
              style={ { width: '200px', height: '150px' } }
            />
            <h3 data-testid={ `${index}-card-name` }>{item.strMeal}</h3>
          </div>
        )))}
      {
        (history.location.pathname === '/meals')
         && (mealsPorCategory.length !== 0)
         && (clickAll === false)
          && mealsPorCategory.map((element, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClickCapture={
                () => redirecionarParaPaginaComId(mealsPorCategory[index].idMeal)
              }
            >
              <img
                src={ element.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt={ element.strMeal }
                style={ { width: '200px', height: '150px' } }
              />
              <h3 data-testid={ `${index}-card-name` }>{element.strMeal}</h3>
            </div>
          ))
      }
      {
        (history.location.pathname === '/drinks') && dataCategoryDrinks.map((el, idx) => (
          <div key={ idx }>
            <button
              type="button"
              data-testid={ `${el.strCategory}-category-filter` }
              onClick={ () => { requestMealsPorCategory(el.strCategory); } }

            >
              {el.strCategory}
            </button>
          </div>
        ))
      }
      {
        (history.location.pathname === '/drinks')
         && (drinksPorCategory.length === 0)
          && dataDrinks.map((element, i) => (
            <div
              key={ i }
              data-testid={ `${i}-recipe-card` }
              onClickCapture={ () => redirecionarParaPaginaComId(dataDrinks[i].idDrink) }>
              <img
                src={ element.strDrinkThumb }
                alt={ element.strDrink }
                data-testid={ `${i}-card-img` }
                style={ { width: '200px', height: '150px' } }
              />
              <h3 data-testid={ `${i}-card-name` }>{element.strDrink}</h3>
            </div>

          ))
      }
      {
        (history.location.pathname === '/drinks')
         && (drinksPorCategory.length !== 0)
          && drinksPorCategory.map((element, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClickCapture={
                () => redirecionarParaPaginaComId(drinksPorCategory[index].idDrink)
              }>
              <img
                src={ element.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt={ element.strDrink }
                style={ { width: '200px', height: '150px' } }
              />
              <h3 data-testid={ `${index}-card-name` }>{element.strDrink}</h3>
            </div>
          ))
      }
    </div>
  );
}
