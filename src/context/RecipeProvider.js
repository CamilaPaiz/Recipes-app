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
  const [searchInput, setSearchInput] = useState('');
  const [radioFilter, setRadioFilter] = useState([]);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [teste, setTeste] = useState(false);

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

  const doze = 12;

  const pegarMeals = (datas) => {
    if (datas.meals !== null) {
      if (datas.meals.length === 1) {
        history.push(`/meals/${datas.meals[0].idMeal}`);
      } else {
        // console.log(datas[0)
        setMealsRecipes(datas.meals.slice(0, doze));
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };
  const pegarDrinks = (datas) => {
    if (datas.drinks !== null) {
      if (datas.drinks.length === 1) {
        history.push(`/drinks/${datas.drinks[0].idDrink}`);
      } else {
        setDrinkRecipes(datas.drinks.slice(0, doze));
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  // const [data, setData] = useState([]);

  const requestApiMeal = async () => {
    if (radioFilter === 'ingredientRadio') {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
      pegarMeals(result);
    } else if (radioFilter === 'nameRadio') {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result.meals);
      setData(result);
      pegarMeals(result);
    } else if (radioFilter === 'firstletterRadio' && searchInput.length === 1) {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;

      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
      pegarMeals(result);
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
      pegarDrinks(result);
    } else if (radioFilter === 'nameRadio') {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;

      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
      pegarDrinks(result);
    } else if (radioFilter === 'firstletterRadio' && searchInput.length === 1) {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;

      const response = await fetch(endPointIngredient);
      const result = await response.json();
      console.log(result);
      setData(result);
      pegarDrinks(result);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  // const handleDrinksResults = () => {
  //   const { location } = history;
  //   const NUMBER = 11;
  //   if (data.drinks.length === 1 && location.pathname === '/drinks') {
  //     history.push(`/drinks/${data.drinks[0].idDrink}`);
  //   } else if (data.drinks.length > 1 && location.pathname === '/drinks') {
  //     // setDrinkRecipes(data.drinks.slice(NUMBER));
  //     console.log(data.drinks.slice(NUMBER));
  //   }
  // };

  // const handleMealsResults = () => {
  //   const { location } = history;
  //   if (data.meals.length === 1 && location.pathname === '/meals') {
  //     history.push(`/meals/${data.meals[0].idMeal}`);
  //   }
  // };
  const handleBtnSearch = async () => {
    const { location } = history;
    if (location.pathname === '/meals') {
      await requestApiMeal();
    } if (location.pathname === '/drinks') {
      await requestApiDrink();
    }
    if (teste === false) {
      setTeste(true);
    } else {
      setTeste(false);
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
    mealsRecipes,
    drinkRecipes,
    teste,
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
    mealsRecipes,
    drinkRecipes,
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
