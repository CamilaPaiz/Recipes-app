import React, { useContext } from 'react';
import Footer from './Footer';
import Header from './Header';
import RecipeContext from '../context/RecipeContext';
import Recipes from './Recipes';

function Meals() {
  const { mealsRecipes, teste } = useContext(RecipeContext);
  return (
    <div>
      <Header />
      {mealsRecipes.map((element, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ element.strMealThumb }
            alt={ element.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{element.strMeal}</h3>
        </div>
      ))}
      {
        !teste && <Recipes />
      }

      <Footer />
    </div>
  );
}

export default Meals;
