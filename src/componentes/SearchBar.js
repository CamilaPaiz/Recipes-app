import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';
import RecipeContext from '../context/RecipeContext';
import '../style/searchBar.css';

export default function SearchBar() {
  const { searchInput,
    handleSearchInput,
    handleRadioFilter,
    handleBtnSearch,
  } = useContext(RecipeContext);

  return (
    <form>
      <br />
      <label htmlFor="search-input">
        <input
          className="searchinput"
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
          className="radiofilter1"
          type="radio"
          name="radioFilter"
          data-testid="ingredient-search-radio"
          value="ingredientRadio"
          onChange={ handleRadioFilter }
        />
        Ingredient
        <input
          className="radiofilter2"
          type="radio"
          name="radioFilter"
          data-testid="name-search-radio"
          value="nameRadio"
          onChange={ handleRadioFilter }
        />
        Name
        <input
          className="radiofilter3"
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
        className="btnsearch"
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleBtnSearch }
      >
        SEARCH
      </button>
    </form>
  );
}
