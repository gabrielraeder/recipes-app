import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/RecipeCard.css';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, index, title, recipesOrRecomm }) {
  const thumb = `str${title.replace('s', '')}Thumb`;
  const string = `str${title.replace('s', '')}`;
  const id = recipe[`id${title.replace('s', '')}`];

  // concatena o index com o resto do testId de acordo com qual pagina está renderizada.
  const titleID = recipesOrRecomm === 'recipes'
    ? `${index}-recipe-card` : `${index}-recommendation-card`;

  // concatena o index com o resto do testId de acordo com qual pagina está renderizada.
  const nameID = recipesOrRecomm === 'recipes'
    ? `${index}-card-name` : `${index}-recommendation-title`;

  return (
    <Link to={ `/${title.toLowerCase()}/${id}` }>
      <li className="recipeCard" data-testid={ titleID }>
        <img
          src={ recipe[thumb] }
          alt={ recipe[string] }
          className="recipeIMG"
          data-testid={ `${index}-card-img` }
        />
        <h4
          className="recipeName"
          data-testid={ nameID }
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
  recipesOrRecomm: PropTypes.string.isRequired,
};
