import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function DoneMealCard({ item, index }) {
  return (
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
      {/* <h4>
        {item.nacionality}
      </h4> */}
      <p data-testid={ `${index}-horizontal-done-date` }>
        {item.doneDate }
      </p>
      <ul>
        {item.tags.slice(0, 2).map((tag, ind) => (
          <li key={ ind } data-testid={ `${index}-${tag}-horizontal-tag` }>
            { tag }
          </li>
        ))}
      </ul>
    </Link>
  );
}

DoneMealCard.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
