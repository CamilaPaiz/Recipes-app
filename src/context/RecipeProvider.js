import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

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

  const context = useMemo(() => ({
    email,
    password,
    isDisabled,
    handleEmail,
    handlePassword,

    handleClick,
  }), [
    email,
    password,
    isDisabled,
    handleEmail,
    handlePassword,

    handleClick,
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
