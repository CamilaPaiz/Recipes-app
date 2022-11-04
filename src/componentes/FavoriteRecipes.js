import React, { useState, useEffect } from 'react';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  // const index = null;
  const favoriteRecipes = JSON?.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favorites, setFavorites] = useState(favoriteRecipes);

  useEffect(() => {
    setFavorites(favoriteRecipes);
  }, []);

  const allFavorites = () => {
    setFavorites(favoriteRecipes);
  };

  const justMeals = () => {
    const meals = favoriteRecipes.filter(({ type }) => type === 'meal');
    setFavorites(meals);
  };

  const justDrinks = () => {
    const drinks = favoriteRecipes.filter(({ type }) => type === 'drink');
    setFavorites(drinks);
  };

  return (
    <>
      <div className="favoriterecipe">
        <Header />
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => allFavorites() }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => justMeals() }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => justDrinks() }
          >
            Drinks
          </button>
        </div>
      </div>
      {favorites.map((favorite, index) => (
        <>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ favorite.image }
            alt={ favorite.name }
          />
          <span data-testid={ `${index}-horizontal-top-text` }>{favorite.category}</span>
          <span data-testid={ `${index}-horizontal-name` }>{favorite.name}</span>
          <button
            type="button"
          >
            <img
              src={ blackHeartIcon }
              alt="Favorite Button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            <img src={ shareIcon } alt="shareicon" />
          </button>
        </>
      ))}
    </>
  );
}
export default FavoriteRecipes;
