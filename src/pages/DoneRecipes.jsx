import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../Styles/DoneRecipes.css';
import { getSavedByKey } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import DoneDrinkCard from '../components/DoneDrinkCard';
import DoneMealCard from '../components/DoneMealCard';
import doneMock from '../tests/mocks/doneRecipesMock';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(doneMock);
  const [doneMeals, setDoneMeals] = useState([]);
  const [doneDrinks, setDoneDrinks] = useState([]);
  const [exhibit, setExhibit] = useState([]);

  // MOCK
  useEffect(() => {
    setDoneRecipes(doneMock);
    setExhibit(doneMock);
    const meals = doneMock.filter((recipe) => recipe.type === 'meal');
    setDoneMeals(meals);
    const drinks = doneMock.filter((recipe) => recipe.type === 'drink');
    setDoneDrinks(drinks);
  }, []);

  // useEffect(() => {
  //   const done = getSavedByKey('doneRecipes');
  //   setDoneRecipes(done);
  //   setExhibit(done);
  //   const meals = done.filter((recipe) => recipe.type === 'meal');
  //   setDoneMeals(meals);
  //   const drinks = done.filter((recipe) => recipe.type === 'drinks');
  //   setDoneDrinks(drinks);
  // }, []);

  const handleClickFilter = ({ target: { value } }) => {
    if (value === 'meal') setExhibit(doneMeals);
    else if (value === 'drink') setExhibit(doneDrinks);
    else setExhibit(doneRecipes);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div className="donePageButtons">
        <button
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
        </button>
        <ul>
          {exhibit.map((item, index) => {
            if (item?.type === 'meal') {
              return (
                <div key={ index }>
                  <DoneMealCard item={ item } index={ index } />
                  <input
                    type="image"
                    alt="shareIcon"
                    className="shareIcon"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    // onClick={ copyToClipBoard }
                  />
                </div>
              );
            }
            return (
              <div key={ index }>
                <DoneDrinkCard item={ item } index={ index } />
                <input
                  type="image"
                  alt="shareIcon"
                  className="shareIcon"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  // onClick={ copyToClipBoard }
                />
              </div>
            );
          })}
        </ul>

      </div>
    </div>
  );
}
