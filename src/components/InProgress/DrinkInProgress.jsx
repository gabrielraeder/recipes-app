import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addInProgressDrinks, getSavedInProgress,
  removeFromInProgress, AddToDoneOrFavorites } from '../../services/localStorage';

export default function DrinkInProgress({ recipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [checks, setChecks] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    setIsAllChecked(checks.every((check) => check === true));
  }, [checks]);

  // apartir da receita, busca e filtra somente os ingredientes e medidas existentes e coloca em novos estados
  useEffect(() => {
    const FIRST_INGREDIENT = Object.keys(recipe).indexOf('strIngredient1');
    const LAST_INGREDIENT = Object.keys(recipe).indexOf('strIngredient15');
    const FIRST_MEASURE = Object.keys(recipe).indexOf('strMeasure1');
    const LAST_MEASURE = Object.keys(recipe).indexOf('strMeasure15');
    const ingredValues = Object.values(recipe).slice(FIRST_INGREDIENT, LAST_INGREDIENT);
    const measuresValues = Object.values(recipe).slice(FIRST_MEASURE, LAST_MEASURE);
    setIngredients(ingredValues.filter((i) => i !== null && i !== ''));
    setMeasures(measuresValues.filter((m) => m !== null && m !== ''));
    if (getSavedInProgress().drinks[recipe.idDrink]) {
      setChecks(getSavedInProgress().drinks[recipe.idDrink]);
    } else {
      setChecks(ingredValues.filter((i) => i).map(() => false));
    }
  }, [recipe]);

  const handleChecks = (index) => {
    const newChecks = checks.map((c, i) => {
      if (i === index) return !c;
      return c;
    });
    addInProgressDrinks(recipe.idDrink, newChecks);
    setChecks(newChecks);
  };

  const doneRecipeObj = () => ({
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate: new Date().toLocaleDateString(),
    tags: recipe.strTags ? recipe.strTags.split(' ') : [],
  });

  const finishButton = () => {
    removeFromInProgress('drinks', recipe.idDrink);
    const obj = doneRecipeObj();
    AddToDoneOrFavorites('doneRecipes', obj);
  };

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
      <h5 data-testid="recipe-category">{ `${recipe?.strCategory} ${alcoholic}` }</h5>
      <ul className="ingredientsList">
        {ingredients.map((ing, index) => (
          <label
            key={ index }
            htmlFor={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-step` }
            className={ checks[index] ? 'scratchText' : '' }
          >
            <input
              type="checkbox"
              name={ `${index}-ingredient` }
              id={ `${index}-ingredient` }
              checked={ checks[index] }
              onChange={ () => handleChecks(index) }
            />
            {`${ing}: ${measures[index]}`}
          </label>
        ))}
      </ul>
      <fieldset>
        <p data-testid="instructions">{ recipe?.strInstructions }</p>
      </fieldset>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ finishButton }
          disabled={ !isAllChecked }
        >
          Finish Recipe
        </button>
      </Link>
    </div>
  );
}

DrinkInProgress.propTypes = {
  // id: PropTypes.string.isRequired,
  recipe: PropTypes.shape().isRequired,
};
