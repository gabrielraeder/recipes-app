import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../Styles/DoneRecipes.css';
import { getSavedByKey } from '../services/localStorage';
import DoneDrinkCard from '../components/DoneDrinkCard';
import DoneMealCard from '../components/DoneMealCard';
import doneMock from '../tests/mocks/doneRecipesMock';
import FilterButtons from '../components/FilterButtons';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(doneMock);
  const [doneMeals, setDoneMeals] = useState([]);
  const [doneDrinks, setDoneDrinks] = useState([]);
  const [exhibit, setExhibit] = useState([]);

  // função para recuperar favoriteRecipes do localStorage e colocar nos estados.
  // doneRecipes recebe todas receitas completas
  // doneMeals recebe comidas completas
  // doneDrinks recebe bebidas completas
  useEffect(() => {
    const done = getSavedByKey('doneRecipes');
    setDoneRecipes(done);
    setExhibit(done);
    const meals = done.filter((recipe) => recipe.type === 'meal');
    setDoneMeals(meals);
    const drinks = done.filter((recipe) => recipe.type === 'drink');
    setDoneDrinks(drinks);
  }, []);

  // altera o conteúdo a ser exibido de acordo com o botão clicado
  const handleClickFilter = ({ target: { value } }) => {
    if (value === 'meal') setExhibit(doneMeals);
    else if (value === 'drink') setExhibit(doneDrinks);
    else setExhibit(doneRecipes);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div className="donePageButtons">
        <FilterButtons handleClickFilter={ handleClickFilter } />
        {/* <button
          type="button"
          data-testid="filter-by-all-btn"
          value="All"
          onClick={ handleClickFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="meal"
          onClick={ handleClickFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleClickFilter }
        >
          Drinks
        </button> */}
        <ul>
          {exhibit.map((item, index) => {
            if (item?.type === 'meal') {
              return (
                <DoneMealCard key={ index } item={ item } index={ index } />
              );
            }
            return (
              <DoneDrinkCard key={ index } item={ item } index={ index } />
            );
          })}
        </ul>

      </div>
    </div>
  );
}
