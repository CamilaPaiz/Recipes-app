import { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function ButtonShareFavorite() {
  const { favorite/* , setFavorite  */ } = useContext(RecipeContext);
  console.log(favorite);
  const { location } = useHistory();
  const params = useParams();
  const [copyUrl, setCopy] = useState(false);
  const handleShareBtn = async () => {
    const TIME = 2000;
    const urlCopied = `http://localhost:3000${location.pathname}`;
    setCopy(true);
    await copy(urlCopied);
    setTimeout(() => setCopy(false), TIME);
    console.log(copy(urlCopied));
  };

  const handleFavoriteBtn = () => {
    const { meals, drinks } = favorite;
    let recipe;
    if (location.pathname === `/meals/${params.id}`) {
      recipe = {
        id: meals[0].idMeal,
        type: 'meal',
        nationality: meals[0].strArea,
        category: meals[0].strCategory,
        alcoholicOrNot: '',
        name: meals[0].strMeal,
        image: meals[0].strMealThumb,
      };
    } else if (location.pathname === `/drinks/${params.id}`) {
      recipe = {
        id: drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: drinks[0].strCategory,
        alcoholicOrNot: drinks[0].strAlcoholic,
        name: drinks[0].strDrink,
        image: drinks[0].strDrinkThumb,
      };
    }
    console.log(recipe);
    const favoritList = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteList = [...favoritList, recipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavoriteBtn() }
      >
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        <img src={ shareIcon } alt="shareicon" />
      </button>
      {copyUrl && <span>Link copied!</span>}
    </div>
  );
}
