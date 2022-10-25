import React from 'react';
import './App.css';
/* import rockGlass from './images/rockGlass.svg'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './componentes/Login';

function App() {
  return (
    <div>
      <RecipeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </RecipeProvider>
    </div>
  );
}

export default App;
