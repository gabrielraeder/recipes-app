import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/RecipeCard.css';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, index, title }) {
  const thumb = `str${title.replace('s', '')}Thumb`;
  const string = `str${title.replace('s', '')}`;
  const id = recipe[`id${title.replace('s', '')}`];
  return (
    <Link to={ `/${title.toLowerCase()}/${id}` }>
      <li className="recipeCard" data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipe[thumb] }
          alt={ recipe[string] }
          className="recipeIMG"
          data-testid={ `${index}-card-img` }
        />
        <h4
          className="recipeName"
          data-testid={ `${index}-card-name` }
        >
          { recipe[string] }
        </h4>
      </li>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
};
