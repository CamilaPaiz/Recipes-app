import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [data, setData] = useState([]);
  // const [dataD, setDataD] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  // const [typeUrl, setypeUrl] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [radioFilter, setRadioFilter] = useState([]);

  useEffect(() => {
    const verifyBtn = () => {
      const validEmail = /\S+@\S+\.\S+/;
      const verifyEmail = validEmail.test(email);
      const numeroMin = 6;
      const verifyPassword = password.length > numeroMin;
      if ((verifyPassword && verifyEmail)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    verifyBtn();
  }, [email, password]);

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  const handleSearchInput = ({ target }) => {
    setSearchInput(target.value);
  };

  const handleRadioFilter = ({ target }) => {
    setRadioFilter(target.value);
  };

  // const [data, setData] = useState([]);

  const requestApiMeal = async () => {
    if (radioFilter === 'ingredientRadio') {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
    } else if (radioFilter === 'nameRadio') {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result.meals);
      setData(result);
    } else if (radioFilter === 'firstletterRadio' && searchInput.length === 1) {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;

      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const requestApiDrink = async () => {
    if (radioFilter === 'ingredientRadio') {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
    } else if (radioFilter === 'nameRadio') {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;

      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
    } else if (radioFilter === 'firstletterRadio' && searchInput.length === 1) {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;

      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleBtnSearch = () => {
    const { location } = history;
    if (location.pathname === '/meals') {
      requestApiMeal();
    } if (location.pathname === '/drinks') {
      requestApiDrink();
    }
  };

  /* const handleBtnSearch = async () => {
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
  }; */

  const context = useMemo(() => ({
    email,
    password,
    isDisabled,
    searchInput,
    radioFilter,
    data,
    setData,
    handleBtnSearch,
    handleClick,
    handleEmail,
    handlePassword,
    /*  verifyBtn, */
    handleSearchInput,
    handleRadioFilter,
    // handleBtnSearch,
  }), [
    email,
    password,
    isDisabled,
    searchInput,
    radioFilter,
    data,
    handleEmail,
    handlePassword,
    /*  verifyBtn, */
  ]);

  return (
    <RecipeContext.Provider value={ context }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipeProvider;
