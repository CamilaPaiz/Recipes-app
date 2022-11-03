import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RecipeContext from '../context/RecipeContext';
import '../style/profile.css';

function Profile() {
  const history = useHistory();
  const { email, getEmail } = useContext(RecipeContext);

  const handleClickLogout = () => {
    localStorage.clear();
    return history.push('/');
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <div className="profile">
      <Header />
      <h3 data-testid="profile-email">{email.email}</h3>
      <br />
      <button
        className="buttondone"
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        className="buttonfav"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        className="buttonlogout"
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
