import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Recommendations from './Recommendations';
import { fetchByID, fetchInitialItems } from '../services/fetchAPI';
import Context from '../context/Context';
import { getSavedByKey } from '../services/localStorage';

export default function DrinkDetail({ id }) {
  const [recipe, setRecipe] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const { setRecipeInProgress } = useContext(Context);

  // faz o fetch apartir do ID e coloca a receita no estado do componente.
  useEffect(() => {
    if (id.includes('recipe')) {
      const myRecipe = getSavedByKey('myRecipes').find((i) => i.id === id);
      setIngredients(Object.keys(myRecipe.ingredientsList));
      setMeasures(Object.values(myRecipe.ingredientsList));
      const newModel = {
        strDrink: myRecipe.name,
        strDrinkThumb: myRecipe.image,
        idDrink: myRecipe.id,
        strCategory: myRecipe.category,
        strArea: myRecipe.nationality,
        strInstructions: myRecipe.instructions,
      };
      setRecipe(newModel);
    } else {
      const idFetch = async () => {
        const { drinks } = await fetchByID(id, 'Drinks');
        setRecipe(drinks[0]);
      };
      idFetch();
    }
  }, []);

  // fetch para setar o estado das receitas recomendadas
  useEffect(() => {
    const RecommendationFoodFetch = async () => {
      const { meals } = await fetchInitialItems('Meals');
      setRecommendation(meals);
    };
    RecommendationFoodFetch();
  }, []);

  // coloca a receita no estado do Provider para ser recuperado na tela de RecipeInProgress
  useEffect(() => {
    setRecipeInProgress(recipe);
  }, [recipe]);

  // apartir da receita, busca e filtra somente os ingredientes e medidas existentes e coloca em novos estados
  useEffect(() => {
    if (!id.includes('recipe')) {
      const FIRST_INGREDIENT = Object.keys(recipe).indexOf('strIngredient1');
      const LAST_INGREDIENT = Object.keys(recipe).indexOf('strIngredient15');
      const FIRST_MEASURE = Object.keys(recipe).indexOf('strMeasure1');
      const LAST_MEASURE = Object.keys(recipe).indexOf('strMeasure15');
      const ingredValues = Object.values(recipe).slice(FIRST_INGREDIENT, LAST_INGREDIENT);
      const measuresValues = Object.values(recipe).slice(FIRST_MEASURE, LAST_MEASURE);
      setIngredients(ingredValues.filter((i) => i !== null));
      setMeasures(measuresValues.filter((m) => m !== null));
    }
  }, [recipe]);

  const alcoholic = recipe?.strAlcoholic === 'Alcoholic' ? '- Alcoholic' : '';

  return (
    <div className="detailsContainer">
      <div className="container">
        <img
          className="detailsImage"
          data-testid="recipe-photo"
          src={ recipe?.strDrinkThumb }
          alt={ recipe?.strDrink }
        />
        <div className="containerText">
          <h3 data-testid="recipe-title">{ recipe?.strDrink }</h3>
          <p data-testid="recipe-category">
            {
              `${recipe?.strCategory} ${alcoholic}`
            }
          </p>
        </div>
      </div>
      <ul className="ingredientsContainer">
        <h4>Ingredients:</h4>
        {ingredients.map((ing, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${ing}: ${measures[index]}`}
          </li>
        ))}
      </ul>
      <div className="instructionsContainer">
        <h4>Instructions:</h4>
        <p data-testid="instructions">{ recipe?.strInstructions }</p>
      </div>
      <div className="carouselContainer">
        {
          recommendation.length > 0 && (
            <Recommendations recommendations={ recommendation } title="Meals" />
          )
        }
      </div>
    </div>
  );
}

DrinkDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
