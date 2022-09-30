import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../Styles/HeartAndShareHeader.css';
import iconeRecipesapp from '../images/iconeRecipesapp.png';
import logoRecipesapp from '../images/logoRecipesapp.png';

export default function FavoriteAndShareButtons({
  isFavorite,
  copyToClipBoard,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
}) {
  return (
    <div className="HeartAndShareHeader">
      <div>
        <input
          type="image"
          alt="iconeRecipesapp"
          className="FavPageIcon"
          src={ iconeRecipesapp }
        />
        <input
          type="image"
          alt="logoRecipesapp"
          className="favLogo"
          src={ logoRecipesapp }
        />
      </div>
      <div>
        { isFavorite ? (
          <input
            type="image"
            alt="blackHeart"
            className="HeartIcon"
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            onClick={ removeRecipeFromFavorites }
          />
        ) : (
          <input
            type="image"
            alt="whiteHeartIcon"
            className="HeartIcon"
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
    </div>
  );
}

FavoriteAndShareButtons.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  copyToClipBoard: PropTypes.func.isRequired,
  addRecipeToFavorites: PropTypes.func.isRequired,
  removeRecipeFromFavorites: PropTypes.func.isRequired,
};
