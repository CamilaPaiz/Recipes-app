import React, { useContext } from 'react';
// import { FaSearch } from 'react-icons/fa';
import RecipeContext from '../context/RecipeContext';

export default function SearchBar() {
  const { searchInput,
    handleSearchInput,
    handleRadioFilter,
    handleBtnSearch,
  } = useContext(RecipeContext);
  return (
    <form>
      {/* <button type="button" data-testid="search-top-btn">
        <FaSearch />
      </button> */}
      <br />
      <label htmlFor="search-input">
        <input
          type="test"
          id="search-input"
          data-testid="search-input"
          value={ searchInput }
          onChange={ handleSearchInput }
        />
      </label>
      <br />
      <label htmlFor="radioFilter">
        <input
          type="radio"
          name="radioFilter"
          data-testid="ingredient-search-radio"
          value="ingredientRadio"
          onChange={ handleRadioFilter }
        />
        Ingredient
        <input
          type="radio"
          name="radioFilter"
          data-testid="name-search-radio"
          value="nameRadio"
          onChange={ handleRadioFilter }
        />
        Name
        <input
          type="radio"
          name="radioFilter"
          data-testid="first-letter-search-radio"
          value="firstletterRadio"
          onChange={ handleRadioFilter }
        />
        First Letter
      </label>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleBtnSearch }
      >
        SEARCH
      </button>
    </form>
  );
}
