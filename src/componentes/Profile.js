import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RecipeContext from '../context/RecipeContext';

function Profile() {
  const history = useHistory();
  const { email } = useContext(RecipeContext);

  const handleClickLogout = () => {
    localStorage.removeItem('user');
    return history.push('/');
  };

  return (
    <div>
      <Header />
      <h2 data-testid="profile-email">{email}</h2>
      <br />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
