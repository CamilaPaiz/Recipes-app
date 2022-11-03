import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from './Header';
import '../style/donerecipe.css';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [recipe, setRecipe] = useState([]);
  const [copyUrl, setCopy] = useState(false);
  /* const [id, setId] = useState(''); */
  const history = useHistory();

  const handleLocalStorage = () => {
    const donerecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipe(donerecipe);
  };
  const handleShareBtn = async () => {
    const TIME = 2000;
    let url;
    // const { meals, drinks } = recipe;
    // console.log(meals);
    if (recipe[0].type === 'meal') {
      url = `http://localhost:3000/meals/${recipe[0].id}`;
    } else if (recipe[0].type === 'drink') {
      url = `http://localhost:3000/drinks/${recipe[0].id}`;
    }
    setCopy(true);
    await copy(url);
    console.log(url);
    setTimeout(() => setCopy(false), TIME);
  };

  const handleHistoryPush = () => {
    if (recipe[0].type === 'meal') {
      history.push(`/meals/${recipe[0].id}`);
    } else if (recipe[0].type === 'drink') {
      history.push(`/drinks/${recipe[0].id}`);
    }
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
                <div>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    alt="card-drink"
                    src={ item.image }
                    onClickCapture={ handleHistoryPush }
                  />
                </div>
                <p
                  onClickCapture={ handleHistoryPush }
                  data-testid={ `${index}-horizontal-name` }
                >
                  {item.name}

                </p>
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
                {copyUrl && <span>Link copied!</span>}
                {item.type === 'meal' ? (
                  <div>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${item.nationality} - ${item.category}`}
                    </p>
                    { item.tags?.map((el, i) => (
                      <p key={ i } data-testid={ `${index}-${el}-horizontal-tag` }>
                        {el}
                      </p>
                    ))}
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
