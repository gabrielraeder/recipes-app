import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';
import '../Styles/RecipeDetails.css';
import { getSavedByKey, getSavedInProgress } from '../services/localStorage';

export default function RecipeDetails({ match }) {
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
    const { params: { id } } = match;
    const doneRecipes = getSavedByKey('doneRecipes');
    setIsDone(doneRecipes.some((recipe) => recipe.id === id));
  }, []);

  useEffect(() => {
    const { params: { id } } = match;
    const inProgress = getSavedInProgress();
    if (inProgress.drinks && Object.keys(inProgress.drinks).includes(id)) {
      setIsInProgress(true);
    }
    if (inProgress.meals && Object.keys(inProgress.meals).includes(id)) {
      setIsInProgress(true);
    }
  }, []);

  // define qual componente exibir baseado no URL da pagina (/meals/:id ou /drinks/:id )
  const mealOrDrink = () => {
    const { params: { id } } = match;
    if (match.url.includes('meals')) {
      return (<MealDetail id={ id } />);
    }
    return (<DrinkDetail id={ id } />);
  };

  return (
    <div>
      {mealOrDrink()}
      { !isDone && (
        <button
          className="startRecipeBtn"
          type="button"
          data-testid="start-recipe-btn"
        >
          { isInProgress ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};
