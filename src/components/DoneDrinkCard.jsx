import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function DoneDrinkCard({ item, index }) {
  return (
    <Link to={ `/drinks/${item.id}` }>
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
        { `${item.category} - ${item.alcoholicOrNot}` }
      </h5>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {item.doneDate }
      </p>
    </Link>
  );
}

DoneDrinkCard.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
