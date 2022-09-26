import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';
import '../Styles/RecipeDetails.css';
import { getSavedByKey, getSavedInProgress } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function RecipeDetails({ match }) {
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

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

  const copyToClipBoard = () => {
    copy(`http://localhost:3000${match.url}`);
    setIsLinkCopied(true);
  };

  return (
    <div className="recipePage">
      <div>
        <input
          type="image"
          alt="blackHeart"
          className="blackHeart"
          data-testid="favorite-btn"
          src={ blackHeartIcon }
        />
        <input
          type="image"
          alt="shareIcon"
          className="shareIcon"
          data-testid="share-btn"
          src={ shareIcon }
          onClick={ copyToClipBoard }
        />
      </div>
      <div>
        { isLinkCopied && <p>Link copied!</p> }
      </div>
      {mealOrDrink()}
      { !isDone && (
        <Link to={ `${match.url}/in-progress` }>
          <button
            className="startRecipeBtn"
            type="button"
            data-testid="start-recipe-btn"
          >
            { isInProgress ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        </Link>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};
