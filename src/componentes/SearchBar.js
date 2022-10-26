import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { FaSearch } from 'react-icons/fa';
import RecipeContext from '../context/RecipeContext';

export default function SearchBar() {
  const { searchInput,
    handleSearchInput,
    handleRadioFilter,
    handleBtnSearch,
  } = useContext(RecipeContext);

  /*  const history = useHistory();

  // const [data, setData] = useState([]);

  const requestApiMeal = async () => {
    if (radioFilter === 'ingredientRadio') {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      try {
        const response = await fetch(endPointIngredient);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (e) { throw new Error(e.message); }
    } else if (radioFilter === 'nameRadio') {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      try {
        const response = await fetch(endPointIngredient);
        const result = await response.json();
        console.log(result.meals);
        setData(result);
      } catch (e) { throw new Error(e.message); }
    } else if (radioFilter === 'firstletterRadio' && searchInput.length === 1) {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      try {
        const response = await fetch(endPointIngredient);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (e) { throw new Error(e.message); }
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const requestApiDrink = async () => {
    if (radioFilter === 'ingredientRadio') {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      try {
        const response = await fetch(endPointIngredient);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (e) { throw new Error(e.message); }
    } else if (radioFilter === 'nameRadio') {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
      try {
        const response = await fetch(endPointIngredient);
        const result = await response.json();
        console.log(result.meals);
        setData(result);
      } catch (e) { throw new Error(e.message); }
    } else if (radioFilter === 'firstletterRadio' && searchInput.length === 1) {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
      try {
        const response = await fetch(endPointIngredient);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (e) { throw new Error(e.message); }
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleBtnSearch = async () => {
    const { location } = history;
    if (location.pathname === '/meals') {
      requestApiMeal();
    } if (location.pathname === '/drinks') {
      requestApiDrink();
    }
  }; */
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
