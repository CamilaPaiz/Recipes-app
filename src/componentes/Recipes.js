import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Recipes() {
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const history = useHistory();
  const doze = 12;

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

  useEffect(() => { requestData(); }, []);

  return (
    <div>
      { (history.location.pathname === '/meals') && dataMeals.map((item, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid={ `${index}-card-img` }
            style={ { width: '200px', height: '150px' } }
          />
          <h3 data-testid={ `${index}-card-name` }>{item.strMeal}</h3>
        </div>
      ))}
      {
        (history.location.pathname === '/drinks')
        && dataDrinks.map((element, i) => (
          <div key={ i } data-testid={ `${i}-recipe-card` }>
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
    </div>
  );
}
