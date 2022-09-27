import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';
import '../Styles/RecipeDetails.css';
import Context from '../context/Context';
import { getSavedByKey, removeFromFavorites,
  getSavedInProgress, AddToDoneOrFavorites } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

export default function RecipeDetails({ match }) {
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { recipeInProgress } = useContext(Context);

  useEffect(() => {
    const { params: { id } } = match;
    const doneRecipes = getSavedByKey('doneRecipes');
    setIsDone(doneRecipes?.some((recipe) => recipe.id === id));
  }, []);

  useEffect(() => {
    const { params: { id } } = match;
    const favorites = getSavedByKey('favoriteRecipes');
    const isFav = favorites.some((fav) => fav.id === id);
    setIsFavorite(isFav);
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

  const addRecipeToFavorites = () => {
    const favRecipeToAdd = {
      id: recipeInProgress?.idMeal || recipeInProgress?.idDrink,
      type: match.url.includes('meals') ? 'meal' : 'drink',
      nationality: recipeInProgress?.strArea || '',
      category: recipeInProgress?.strCategory,
      alcoholicOrNot: recipeInProgress?.strAlcoholic || '',
      name: recipeInProgress?.strMeal || recipeInProgress?.strDrink,
      image: recipeInProgress?.strMealThumb || recipeInProgress?.strDrinkThumb,
    };
    AddToDoneOrFavorites('favoriteRecipes', favRecipeToAdd);
    setIsFavorite(true);
  };

  const removeRecipeFromFavorites = () => {
    const { params: { id } } = match;
    removeFromFavorites('favoriteRecipes', id);
    setIsFavorite(false);
  };

  return (
    <div className="recipePage">
      <div>
        { isFavorite ? (
          <input
            type="image"
            alt="blackHeart"
            className="blackHeart"
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            onClick={ removeRecipeFromFavorites }
          />
        ) : (
          <input
            type="image"
            alt="whiteHeartIcon"
            className="whiteHeartIcon"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            onClick={ addRecipeToFavorites }
          />
        ) }
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
