import React from 'react';
import './App.css';
/* import rockGlass from './images/rockGlass.svg'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './componentes/Login';
import Header from './componentes/Header';

function App() {
  return (
    <div>
      <Header />
      <RecipeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/meals" component={ App } />
            <Route path="/drinks" component={ App } />
            <Route path="/meals/:id-da-receita" component={ App } />
            <Route path="/drinks/:id-da-receita" component={ App } />
            <Route path="/meals/:id-da-receita/in-progress" component={ App } />
            <Route path="/drinks/:id-da-receita/in-progress" component={ App } />
            <Route path="/profile" component={ App } />
            <Route path="/done-recipes" component={ App } />
            <Route path="/favorite-recipes" component={ App } />
          </Switch>
        </BrowserRouter>
      </RecipeProvider>
    </div>
  );
}

export default App;
