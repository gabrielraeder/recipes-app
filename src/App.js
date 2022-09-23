import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './components/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealRecipe from './pages/MealRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinkInProgress from './pages/DrinkInProgress';
import MealInProgress from './pages/MealInProgress';
import Profile from './pages/Profile';
import Done from './pages/Done';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Provider>
      <div className="meals">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ MealRecipe } />
          <Route exact path="/drinks/:id" component={ DrinkRecipe } />
          <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ Done } />
          <Route exact path="/favorite-recipes" component={ Favorites } />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
