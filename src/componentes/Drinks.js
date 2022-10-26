import React, { useContext } from 'react';
import Header from './Header';
import RecipeContext from '../context/RecipeContext';
import Footer from './Footer';

function Drinks() {
  const { drinkRecipes } = useContext(RecipeContext);
  console.log(drinkRecipes);
  return (
    <div>
      <Header />
      {drinkRecipes.map((element, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ element.strDrinkThumb }
            alt={ element.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{element.strDrink}</h3>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;
