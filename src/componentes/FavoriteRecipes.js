import React from 'react';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  return (
    <>
      <div className="favoriterecipe">
        <Header />
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
      </div>
      <img
        data-testid={ `${index}-horizontal-image` }
        alt="foto"
      />
      <span data-testid={ `${index}-horizontal-top-text` } />
      <span data-testid={ `${index}-horizontal-name` } />
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
  );
}
export default FavoriteRecipes;
