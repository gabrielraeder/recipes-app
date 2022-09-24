import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/RecipeCard.css';

export default function RecipeCard({ recipe, index, title }) {
  const thumb = `str${title.replace('s', '')}Thumb`;
  const string = `str${title.replace('s', '')}`;
  return (
    <div className="recipeCard" data-testid={ `${index}-recipe-card` }>
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
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
};
