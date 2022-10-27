import React, { useContext } from 'react';
import Header from './Header';
import Recipes from './Recipes';
import RecipeContext from '../context/RecipeContext';
import Footer from './Footer';

function Drinks() {
  const { drinkRecipes, teste } = useContext(RecipeContext);
  console.log(drinkRecipes);
  return (
    <div>
      <Header />
      {teste && drinkRecipes.map((element, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ element.strDrinkThumb }
            alt={ element.strDrink }
            data-testid={ `${index}-card-img` }
            style={ { width: '200px', height: '150px' } }
          />
          <h3 data-testid={ `${index}-card-name` }>{element.strDrink}</h3>
        </div>
      ))}
      {
        (!teste) && <Recipes />
      }
      <Footer />
    </div>
  );
}

export default Drinks;
