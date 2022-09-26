import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';
import '../Styles/RecipeDetails.css';
import { getSavedByKey } from '../services/localStorage';

export default function RecipeDetails({ match }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const { params: { id } } = match;
    const doneRecipes = getSavedByKey('doneRecipes');
    setIsDone(doneRecipes.some((recipe) => recipe.id === id));
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
          Start Recipe
        </button>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};
