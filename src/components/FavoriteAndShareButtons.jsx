import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteAndShareButtons({
  isFavorite,
  copyToClipBoard,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
}) {
  return (
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
  );
}

FavoriteAndShareButtons.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  copyToClipBoard: PropTypes.func.isRequired,
  addRecipeToFavorites: PropTypes.func.isRequired,
  removeRecipeFromFavorites: PropTypes.func.isRequired,
};
