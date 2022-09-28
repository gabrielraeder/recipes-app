import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteMealCard({ item, index }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  // coloca no clipboard o link para acessar a página atual
  const copyToClipBoard = () => {
    copy(`http://localhost:3000/meals/${item.id}`);
    setIsLinkCopied(true);
  };

  return (
    <div>
      <Link to={ `/meals/${item.id}` }>
        <img
          src={ item.image }
          alt={ item.name }
          className="recipeIMG"
          data-testid={ `${index}-horizontal-image` }
        />
        <h4
          className="recipeName"
          data-testid={ `${index}-horizontal-name` }
        >
          { item.name }
        </h4>
        <h5
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${item.nationality} - ${item.category}` }
        </h5>
      </Link>
      <input
        type="image"
        alt="shareIcon"
        className="shareIcon"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ copyToClipBoard }
      />
      { isLinkCopied && <p>Link copied!</p> }
    </div>
  );
}

FavoriteMealCard.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
