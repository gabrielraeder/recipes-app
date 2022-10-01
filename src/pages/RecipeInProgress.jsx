import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MealInProgress from '../components/InProgress/MealInProgress';
import DrinkInProgress from '../components/InProgress/DrinkInProgress';
import FavoriteAndShareButtons from '../components/FavoriteAndShareButtons';
import { getSavedByKey, removeFromFavorites,
  AddToDoneOrFavorites } from '../services/localStorage';
import Context from '../context/Context';
import '../Styles/InProgress.css';

const copy = require('clipboard-copy');

export default function RecipeInProgress({ match }) {
  const { recipeInProgress } = useContext(Context);

  const [isFavorite, setIsFavorite] = useState(false);

  // recupera favoriteRecipes para checar se a receita atual está favoritada
  useEffect(() => {
    const { params: { id } } = match;
    const favorites = getSavedByKey('favoriteRecipes');
    const isFav = favorites.some((fav) => fav.id === id);
    setIsFavorite(isFav);
  }, []);

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

  // coloca no clipboard o link para acessar a página atual
  const copyToClipBoard = () => {
    copy(`http://localhost:3000${match.url}`);
    setIsLinkCopied(true);
  };

  // define qual componente exibir baseado no URL da pagina (/meals/:id ou /drinks/:id )
  const mealOrDrink = () => {
    if (match.url.includes('meals')) {
      return (<MealInProgress />);
    }
    return (<DrinkInProgress />);
  };

  return (
    <div className="recipePage">
      <FavoriteAndShareButtons
        isFavorite={ isFavorite }
        removeRecipeFromFavorites={ removeRecipeFromFavorites }
        addRecipeToFavorites={ addRecipeToFavorites }
        copyToClipBoard={ copyToClipBoard }
      />
      {mealOrDrink()}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
};
