import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    <div>
      {localizacao === 'meals'
        || localizacao === 'drinks'
        || localizacao === 'profile'
        || localizacao === done || localizacao === favoriteRecipes ? (
          <div>
            <h2 data-testid="page-title">{titulo !== undefined && titulo}</h2>
            <button
              type="button"
              onClick={ () => history.push('/profile') }
            >
              <img
                data-testid="profile-top-btn"
                src="../images/profileIcon.svg"
                alt="Perfil"
              />
            </button>
            {localizacao !== 'profile'
            && localizacao !== done && localizacao !== favoriteRecipes
              ? (
                <button type="button" onClick={ () => { click(input); } }>
                  <img
                    data-testid="search-top-btn"
                    src="../images/searchIcon.svg"
                    alt="Pesquisar"
                  />
                </button>
              ) : null}
          </div>
        ) : null}
      {input === true && (
        <div>
          <input type="text" data-testid="search-input" />
        </div>
      )}
    </div>
  );
}

export default Header;
