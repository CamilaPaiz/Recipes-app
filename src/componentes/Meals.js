import React, { useContext } from 'react';
import Header from './Header';
import RecipeContext from '../context/RecipeContext';

function Meals() {
  const { data } = useContext(RecipeContext);
  return (
    <div>
      <Header />
    </div>
  );
}

export default Meals;
