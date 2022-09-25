import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchByID } from '../services/fetchAPI';

// const FIRST_INGREDIENT = 17;
// const LAST_INGREDIENT = 32;
// const FIRST_MEASURE = 32;
// const LAST_MEASURE = 47;

export default function DrinkDetail({ id }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const idFetch = async () => {
      const { drinks } = await fetchByID(id, 'Drinks');
      setRecipe(drinks[0]);
    };
    idFetch();
  }, []);

  useEffect(() => {
    const FIRST_INGREDIENT = Object.keys(recipe).indexOf('strIngredient1');
    const LAST_INGREDIENT = Object.keys(recipe).indexOf('strIngredient15');
    const FIRST_MEASURE = Object.keys(recipe).indexOf('strMeasure1');
    const LAST_MEASURE = Object.keys(recipe).indexOf('strMeasure15');
    const ingredValues = Object.values(recipe).slice(FIRST_INGREDIENT, LAST_INGREDIENT);
    const measuresValues = Object.values(recipe).slice(FIRST_MEASURE, LAST_MEASURE);
    setIngredients(ingredValues.filter((i) => i !== null));
    setMeasures(measuresValues.filter((m) => m !== null));
  }, [recipe]);

  const alcoholic = recipe?.strAlcoholic === 'Alcoholic' ? '- Alcoholic' : '';

  return (
    <div>
      <img
        className="detailsImage"
        data-testid="recipe-photo"
        src={ recipe?.strDrinkThumb }
        alt={ recipe?.strDrink }
      />
      <h3 data-testid="recipe-title">{ recipe?.strDrink }</h3>
      <h5 data-testid="recipe-category">
        {
          `${recipe?.strCategory} ${alcoholic}`
        }
      </h5>
      <ul>
        {ingredients.map((ing, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${ing}: ${measures[index]}`}
          </li>
        ))}
      </ul>
      <fieldset>
        <p data-testid="instructions">{ recipe?.strInstructions }</p>
      </fieldset>
    </div>
  );
}

DrinkDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
