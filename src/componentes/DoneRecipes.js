import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import '../style/donerecipe.css';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [recipe, setRecipe] = useState([]);
  const [copy, setCopy] = useState(false);
  const { location } = useHistory();
  const handleLocalStorage = () => {
    const donerecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipe(donerecipe);
  };
  const handleShareBtn = async () => {
    const TIME = 2000;
    const urlCopied = `http://localhost:3000${location.pathname}`;
    setCopy(true);
    await copy(urlCopied);
    setTimeout(() => setCopy(false), TIME);
  };

  useEffect(() => {
    handleLocalStorage();
  }, []);

  return (
    <div className="donerecipe">
      <div>
        <Header />
        <h1>Done Recipes</h1>
        <div>
          <button type="button" data-testid="filter-by-all-btn">All</button>
          <button type="button" data-testid="filter-by-meal-btn">Meals</button>
          <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
        </div>
        <div>
          {
            recipe.map((item, index) => (
              <div key={ index }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  alt="card-drink"
                  src={ item.image }
                />
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
                <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
                <button
                  type="button"
                  onClick={ handleShareBtn }
                >
                  <img
                    src={ shareIcon }
                    alt="shareicon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />

                </button>
                {copy && <span>Link copied!</span>}
                {item.type === 'meal' ? (
                  <div>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${item.nationality} - ${item.category}`}
                    </p>
                    {(item.tags).length > 1 ? (
                      <div>
                        <p data-testid={ `${index}-${item.tags}-horizontal-tag` }>
                          {item[0].tags}
                        </p>
                        <p
                          data-testid={ `${index}-${item.tags}-horizontal-tag` }
                        >
                          {item[1].tags}
                        </p>
                      </div>
                    )
                      : (
                        <p data-testid={ `${index}-${item.tags}-horizontal-tag` }>
                          {item.tags}
                        </p>
                      )}
                  </div>)
                  : (
                    <div>

                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {item.alcoholicOrNot}
                      </p>
                    </div>
                  )}

              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default DoneRecipes;
