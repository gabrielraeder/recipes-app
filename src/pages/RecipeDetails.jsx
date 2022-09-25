import React from 'react';
import PropTypes from 'prop-types';
import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';
import '../Styles/RecipeDetails.css';

export default function RecipeDetails({ match }) {
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
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};
