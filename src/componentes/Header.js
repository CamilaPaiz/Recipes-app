import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../style/header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [input, setInput] = useState(false);
  const click = (result) => {
    if (result === true) {
      setInput(false);
    } else {
      setInput(true);
    }
  };
  let titulo;
  const history = useHistory();
  const { location } = history;
  console.log(location.pathname);
  const localizacao = location.pathname.substring(1);
  const done = 'done-recipes';
  const favoriteRecipes = 'favorite-recipes';
  if (localizacao !== '') {
    titulo = localizacao[0].toUpperCase() + localizacao.substring(1);
  }
  if (localizacao === done) {
    titulo = 'Done Recipes';
  } else if (localizacao === favoriteRecipes) {
    titulo = 'Favorite Recipes';
  }
  return (
    <div className="header">
      {localizacao === 'meals'
        || localizacao === 'drinks'
        || localizacao === 'profile'
        || localizacao === done || localizacao === favoriteRecipes ? (
          <div>
            <h2
              className="header-title"
              data-testid="page-title"
            >
              {titulo !== undefined && titulo}

            </h2>
            <button
              type="button"
              onClick={ () => history.push('/profile') }
            >
              <img
                className="profileicon"
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="Perfil"
              />
            </button>
            {localizacao !== 'profile'
            && localizacao !== done && localizacao !== favoriteRecipes
              ? (
                <button type="button" onClick={ () => { click(input); } }>
                  <img
                    className="searchicon"
                    data-testid="search-top-btn"
                    src={ searchIcon }
                    alt="Pesquisar"
                  />
                </button>
              ) : null}
          </div>
        ) : null}
      {input === true && (
        <div>
          {/*  <input type="text" placeholder="Procure" data-testid="search-input" /> */}
          <SearchBar />
        </div>
      )}
    </div>
  );
}

export default Header;
