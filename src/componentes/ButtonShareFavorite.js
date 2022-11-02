import { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHearticon from '../images/blackHeartIcon.svg';

export default function ButtonShareFavorite() {
  const { favorite/* , setFavorite  */ } = useContext(RecipeContext);
  // console.log(favorite);
  const { location } = useHistory();
  const params = useParams();
  const [copyUrl, setCopy] = useState(false);
  const [heart, setHeart] = useState(false);

  const handleShareBtn = async () => {
    const TIME = 2000;
    const urlCopied = `http://localhost:3000${location.pathname}`;
    setCopy(true);
    await copy(urlCopied);
    setTimeout(() => setCopy(false), TIME);
    console.log(copy(urlCopied));
  };

  const searchFavorite = () => {
    const favoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteReponse = favoriteRecipes.some(({ id }) => id === params.id);

    if (favoriteReponse) setHeart(!heart);
  };

  const handleFavoriteBtn = () => {
    const newFavorite = [...favorite];
    const { meals, drinks } = newFavorite[0];
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
    setHeart(!heart);
    const favoritList = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoritList.some(({ id }) => id === params.id)) {
      const teste = favoritList.filter(({ id }) => id !== params.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
    } else {
      const favoriteList = [...favoritList, recipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));
    }
  };

  useEffect(() => {
    searchFavorite();
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleFavoriteBtn() }
      >
        <img
          src={ heart ? blackHearticon : whiteHeartIcon }
          alt="blackHearticon"
          data-testid="favorite-btn"
        />
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
