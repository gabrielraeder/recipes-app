import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealInProgress from '../components/InProgress/MealInProgress';
import DrinkInProgress from '../components/InProgress/DrinkInProgress';
import FavoriteAndShareButtons from '../components/FavoriteAndShareButtons';
import { getSavedByKey, removeFromFavorites,
  AddToDoneOrFavorites } from '../services/localStorage';
import '../Styles/InProgress.css';
import { fetchByID } from '../services/fetchAPI';

const copy = require('clipboard-copy');

export default function RecipeInProgress({ match }) {
  const [recipe, setRecipe] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const title = match.url.includes('meals') ? 'Meals' : 'Drinks';
    const { params: { id } } = match;
    const idFetch = async () => {
      const data = await fetchByID(id, title);
      if (title === 'Meals') setRecipe(data.meals[0]);
      else setRecipe(data.drinks[0]);
    };
    idFetch();
  }, []);

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
      id: recipe?.idMeal || recipe?.idDrink,
      type: match.url.includes('meals') ? 'meal' : 'drink',
      nationality: recipe?.strArea || '',
      category: recipe?.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      name: recipe?.strMeal || recipe?.strDrink,
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
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
    const string = match.url.split('/');
    string.pop();
    copy(`http://localhost:3000${string.join('/')}`);
    setIsLinkCopied(true);
  };

  // define qual componente exibir baseado no URL da pagina (/meals/:id ou /drinks/:id )
  const mealOrDrink = () => {
    if (match.url.includes('meals')) {
      return (<MealInProgress recipe={ recipe } />);
    }
    return (<DrinkInProgress recipe={ recipe } />);
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
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
};
