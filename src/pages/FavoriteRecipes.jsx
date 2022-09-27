import React, { useState, useEffect } from 'react';
import FavoriteMealCard from '../components/FavoriteMealCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import Header from '../components/Header';
import { getSavedByKey, removeFromFavorites } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import FilterButtons from '../components/FilterButtons';
import '../Styles/FavoriteRecipes.css';

export default function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favMeals, setFavMeals] = useState([]);
  const [favDrinks, setFavDrinks] = useState([]);
  const [exhibit, setExhibit] = useState([]);
  const [removedFavorite, setRemovedFavorite] = useState(false);

  const recoverFavorites = () => {
    const favorites = getSavedByKey('favoriteRecipes');
    setFavoriteRecipes(favorites);
    setExhibit(favorites);
    const meals = favorites.filter((recipe) => recipe.type === 'meal');
    setFavMeals(meals);
    const drinks = favorites.filter((recipe) => recipe.type === 'drink');
    setFavDrinks(drinks);
    setRemovedFavorite(false);
  };

  useEffect(() => {
    recoverFavorites();
  }, [removedFavorite]);

  const handleClickFilter = ({ target: { value } }) => {
    if (value === 'meal') setExhibit(favMeals);
    else if (value === 'drink') setExhibit(favDrinks);
    else setExhibit(favoriteRecipes);
  };

  const removeRecipeFromFavorites = ({ target: { value } }) => {
    removeFromFavorites('favoriteRecipes', value);
    setRemovedFavorite(true);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div className="favoritesContainer">
        <FilterButtons handleClickFilter={ handleClickFilter } />
        {
          exhibit.map((item, index) => {
            if (item?.type === 'meal') {
              return (
                <div key={ index }>
                  <FavoriteMealCard item={ item } index={ index } />
                  <input
                    type="image"
                    alt="blackHeart"
                    className="blackHeart"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    value={ item.id }
                    src={ blackHeartIcon }
                    onClick={ removeRecipeFromFavorites }
                  />
                </div>
              );
            }
            return (
              <div key={ index }>
                <FavoriteDrinkCard item={ item } index={ index } />
                <input
                  type="image"
                  alt="blackHeart"
                  className="blackHeart"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  value={ item.id }
                  src={ blackHeartIcon }
                  onClick={ removeRecipeFromFavorites }
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
