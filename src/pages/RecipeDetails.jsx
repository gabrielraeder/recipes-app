import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MealDetail from '../components/MealDetail';
import DrinkDetail from '../components/DrinkDetail';
import '../Styles/RecipeDetails.css';
import Context from '../context/Context';
import { getSavedByKey, removeFromFavorites,
  getSavedInProgress, AddToDoneOrFavorites } from '../services/localStorage';
import FavoriteAndShareButtons from '../components/FavoriteAndShareButtons';

const copy = require('clipboard-copy');

export default function RecipeDetails({ match }) {
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { recipeInProgress } = useContext(Context);

  // recupera doneRecipes para checar se a receita atual está completa
  useEffect(() => {
    const { params: { id } } = match;
    const doneRecipes = getSavedByKey('doneRecipes');
    setIsDone(doneRecipes?.some((recipe) => recipe.id === id));
  }, []);

  // recupera favoriteRecipes para checar se a receita atual está favoritada
  useEffect(() => {
    const { params: { id } } = match;
    const favorites = getSavedByKey('favoriteRecipes');
    const isFav = favorites.some((fav) => fav.id === id);
    setIsFavorite(isFav);
  }, []);

  // recupera inProgressRecipes para checar se a receita atual está em progresso
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

  // coloca no clipboard o link para acessar a página atual
  const copyToClipBoard = () => {
    copy(`http://localhost:3000${match.url}`);
    setIsLinkCopied(true);
  };

  // monta o objeto desta receita e o adiciona no localStorage junto as outras favoritas
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

  // remove a receita atual do localStorage chave favoriteRecipes
  const removeRecipeFromFavorites = () => {
    const { params: { id } } = match;
    removeFromFavorites('favoriteRecipes', id);
    setIsFavorite(false);
  };

  return (
    <div className="recipePage">
      <FavoriteAndShareButtons
        isFavorite={ isFavorite }
        removeRecipeFromFavorites={ removeRecipeFromFavorites }
        addRecipeToFavorites={ addRecipeToFavorites }
        copyToClipBoard={ copyToClipBoard }
      />
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
