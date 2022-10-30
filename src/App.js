import React from 'react';
import './App.css';
/* import rockGlass from './images/rockGlass.svg'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './componentes/Login';
import Meals from './componentes/Meals';
import MealsId from './componentes/MealsId';
import Drinks from './componentes/Drinks';
import Profile from './componentes/Profile';
import DoneRecipes from './componentes/DoneRecipes';
import FavoriteRecipes from './componentes/FavoriteRecipes';
import DrinksId from './componentes/DrinksId';
import ProgressDrinks from './componentes/ProgressDrinks';
import ProgressMeals from './componentes/ProgressMeals';

function App() {
  return (
    <div>
      <RecipeProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ MealsId } />
          <Route exact path="/drinks/:id" component={ DrinksId } />
          <Route path="/meals/:id/in-progress" component={ ProgressMeals } />
          <Route
            path="/drinks/:id/in-progress"
            component={ ProgressDrinks }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </RecipeProvider>
    </div>
  );
}

export default App;
