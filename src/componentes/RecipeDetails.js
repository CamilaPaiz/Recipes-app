import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import '../style/recipesDetails.css';
import ButtonShareFavorite from './ButtonShareFavorite';

export default function RecipeDetails() {
  const history = useHistory();
  const params = useParams();
  const { detailsIDMeals, setDetailsIDMeals } = useContext(RecipeContext);
  const { detailsIDDrinks, setDetailsIDDrinks } = useContext(RecipeContext);
  const { favorite, setFavorite } = useContext(RecipeContext);
  console.log(favorite);
  const [drinkRoute, setdrinkRoute] = useState(false);
  const [mealsRoute, setmealsRoute] = useState(false);
  const [ingrediente, setIngrediente] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [recomendationsD, setRecomendationsD] = useState([]);
  const [contador, setContador] = useState(1);
  const [startRec/* , setstartRec */] = useState(true);

  const requestdetailsRecipe = async () => {
    let edId;
    if (history.location.pathname === `/meals/${params.id}`) edId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    else if (history.location.pathname === `/drinks/${params.id}`) edId = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
    const response = await fetch(edId);
    const result = await response.json();
    if (history.location.pathname === `/meals/${params.id}`) {
      setDetailsIDMeals(result);
      setFavorite([result]);
      const respondeApi = result.meals[0];
      const pegaIngrediente = Object.entries(respondeApi)
        .filter((ingred) => ingred[0].includes('strIngredient')
        && ingred[1] !== '' && ingred[1] !== null).map((ingred) => ingred[1]);
      const pegaMesure = Object.entries(respondeApi)
        .filter((mesure) => mesure[0].includes('strMeasure')
        && mesure[1] !== '' && mesure[1] !== null).map((mesure) => mesure[1]);
      setIngrediente(pegaIngrediente);
      setMeasure(pegaMesure);
      setmealsRoute(true);
      setdrinkRoute(false);
    } else if (history.location.pathname === `/drinks/${params.id}`) {
      setDetailsIDDrinks(result);
      setFavorite([result]);
      const respondeApiD = result.drinks[0];
      const pegaIngredienteD = Object.entries(respondeApiD)
        .filter((ingred) => ingred[0].includes('strIngredient')
        && ingred[1] !== '' && ingred[1] !== null).map((ingred) => ingred[1]);
      setIngrediente(pegaIngredienteD);
      const pegaMesure = Object.entries(respondeApiD)
        .filter((mesure) => mesure[0].includes('strMeasure')
        && mesure[1] !== '' && mesure[1] !== null).map((mesure) => mesure[1]);
      setMeasure(pegaMesure);
      setdrinkRoute(true);
      setmealsRoute(false);
    }
  };
  const requestRecomendations = async () => {
    let endp;
    if (history.location.pathname === `/meals/${params.id}`) endp = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    else if (history.location.pathname === `/drinks/${params.id}`) endp = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endp);
    const result = await response.json();
    if (history.location.pathname === `/meals/${params.id}`) {
      setRecomendations(result.drinks.slice(0, '6'));
    } else if (history.location.pathname === `/drinks/${params.id}`) {
      setRecomendationsD(result.meals.slice(0, '6'));
    }
  };
  useEffect(() => {
    requestdetailsRecipe();
    requestRecomendations();
  }, []);
  const handleClick = () => {
    if (history.location.pathname === `/meals/${params.id}`) {
      history.push(`/meals/${params.id}/in-progress`);
    } else if (history.location.pathname === `/drinks/${params.id}`) {
      history.push(`/drinks/${params.id}/in-progress`);
    }
  };
  return (
    <div>
      <ButtonShareFavorite />
      {
        drinkRoute && detailsIDDrinks.drinks.map((item, index) => (
          <div key={ index }>
            <img
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid="recipe-photo"
              style={ { width: '200px', height: '150px' } }
            />
            <h3 data-testid="recipe-title">{item.strDrink}</h3>
            <p data-testid="recipe-category">{item.strAlcoholic}</p>
            <p data-testid="instructions">{item.strInstructions}</p>
            { ingrediente.map((el, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                { el}
              </p>
            )) }
            {
              measure.map((e, i) => (
                <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  { e}
                </p>
              ))
            }
            <div className="carousel">
              { recomendationsD.map((e, i) => (
                (i > contador - 2) && (i <= contador) ? (
                  <div
                    className="carouselF"
                    key={ i }
                    data-testid={ `${i}-recommendation-card` }
                  >
                    <p data-testid={ `${i}-recommendation-title` }>{e.strMeal}</p>
                    <div className="image">
                      <img
                        src={ e.strMealThumb }
                        alt={ e.strMeal }
                        data-testid="recipe-photo"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="carouselF"
                    key={ i }
                    data-testid={ `${i}-recommendation-card` }
                    style={ { display: 'none' } }
                  >
                    <p data-testid={ `${i}-recommendation-title` }>{e.strMeal}</p>
                    <div className="image">
                      <img
                        src={ e.strMealThumb }
                        alt={ e.strMeal }
                        data-testid="recipe-photo"
                      />
                    </div>
                  </div>
                )
              )) }
            </div>
            <button type="button" onClick={ () => setContador(contador - 2) }>⇐</button>
            <button type="button" onClick={ () => setContador(contador + 2) }>⇒</button>
          </div>
        ))
      }
      {
        (mealsRoute) && detailsIDMeals.meals.map((item, index) => (
          <div key={ index }>
            <img
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid="recipe-photo"
              style={ { width: '200px', height: '150px' } }
            />
            <h3 data-testid="recipe-title">{item.strMeal}</h3>
            <p data-testid="recipe-category">{item.strCategory}</p>
            <p data-testid="instructions">{item.strInstructions}</p>
            { ingrediente.map((e, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                { e}
              </p>
            )) }
            { measure.map((el, idx) => (
              <p key={ idx } data-testid={ `${idx}-ingredient-name-and-measure` }>
                {el}
              </p>
            ))}
            <iframe
              width="420"
              height="315"
              src={ item.strYoutube }
              title={ item.strMeal }
              data-testid="video"
            />
            <div className="carousel">
              { recomendations.map((e, i) => (
                (i > contador - 2) && (i <= contador) ? (
                  <div
                    className="carouselF"
                    key={ i }
                    data-testid={ `${i}-recommendation-card` }
                  >
                    <p data-testid={ `${i}-recommendation-title` }>{e.strDrink}</p>
                    <div className="image">
                      <img
                        src={ e.strDrinkThumb }
                        alt={ e.strDrink }
                        data-testid="recipe-photo"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="carouselF"
                    key={ i }
                    data-testid={ `${i}-recommendation-card` }
                    style={ { display: 'none' } }
                  >
                    <p data-testid={ `${i}-recommendation-title` }>{e.strDrink}</p>
                    <div className="image">
                      <img
                        src={ e.strDrinkThumb }
                        alt={ e.strDrink }
                        data-testid="recipe-photo"
                      />
                    </div>
                  </div>
                )
              )) }
            </div>
            <button type="button" onClick={ () => setContador(contador - 2) }>⇐</button>
            <button type="button" onClick={ () => setContador(contador + 2) }>⇒</button>
          </div>
        ))
      }
      <br />

      <button
        onClick={ handleClick }
        className="recipesDetails"
        data-testid="start-recipe-btn"
        type="button"
      >
        { startRec === false ? 'Start Recipe' : 'Continue Recipe' }
      </button>

    </div>
  );
}
