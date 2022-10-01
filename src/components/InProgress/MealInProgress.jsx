import React, { useEffect, useState, useContext } from 'react';
import Context from '../../context/Context';
import { addInProgressMeals, getSavedInProgress,
  removeFromInProgress, AddToDoneOrFavorites } from '../../services/localStorage';

export default function MealInProgress() {
  const { recipeInProgress } = useContext(Context);

  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [checks, setChecks] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [storedInProgress, setStoredInProgress] = useState({ meals: {}, drinks: {} });

  useEffect(() => {
    setRecipe(recipeInProgress);
    setStoredInProgress(getSavedInProgress());
  }, []);

  const doneRecipeObj = () => ({
    id: recipe.idMeal,
    type: 'meal',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
    doneDate: new Date().toLocaleDateString(),
    tags: recipe.strTags ? recipe.strTags.split(' ') : [],
  });

  useEffect(() => {
    if (checks.some((check) => check === false)) {
      addInProgressMeals(recipe.idMeal, checks);
    } else {
      removeFromInProgress('meals', recipe.idMeal);
      const obj = doneRecipeObj();
      AddToDoneOrFavorites('doneRecipes', obj);
    }
    setIsAllChecked(checks.every((check) => check === true));
  }, [checks]);

  // apartir da receita, busca e filtra somente os ingredientes e medidas existentes e coloca em novos estados
  useEffect(() => {
    const FIRST_INGREDIENT = Object.keys(recipe).indexOf('strIngredient1');
    const LAST_INGREDIENT = Object.keys(recipe).indexOf('strIngredient20');
    const FIRST_MEASURE = Object.keys(recipe).indexOf('strMeasure1');
    const LAST_MEASURE = Object.keys(recipe).indexOf('strMeasure20');
    const ingredValues = Object.values(recipe).slice(FIRST_INGREDIENT, LAST_INGREDIENT);
    const measuresValues = Object.values(recipe).slice(FIRST_MEASURE, LAST_MEASURE);
    setIngredients(ingredValues.filter((i) => i));
    setMeasures(measuresValues.filter((m) => m !== ' '));
    if (storedInProgress.meals[recipe.idMeal]) {
      setChecks(storedInProgress.meals[recipe.idMeal]);
    } else {
      setChecks(ingredValues.filter((i) => i).map(() => false));
    }
  }, [recipe]);

  const handleChecks = (index) => {
    const newChecks = checks.map((c, i) => {
      if (i === index) return !c;
      return c;
    });
    setChecks(newChecks);
  };

  return (
    <div>
      <img
        className="detailsImage"
        data-testid="recipe-photo"
        src={ recipe?.strMealThumb }
        alt={ recipe?.strMeal }
      />
      <h3 data-testid="recipe-title">{ recipe?.strMeal }</h3>
      <h5 data-testid="recipe-category">{ recipe?.strCategory }</h5>
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
              disabled={ isAllChecked }
            />
            {`${ing}: ${measures[index]}`}
          </label>
        ))}
      </ul>
      <fieldset>
        <p data-testid="instructions">{ recipe?.strInstructions }</p>
      </fieldset>
    </div>
  );
}
