import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import RecipeCard from './RecipeCard';

const LAST_CARD = 12;

export default function Recipes({ title }) {
  const [recipes, setRecipes] = useState([]);

  const { searchResponse } = useContext(Context);

  // recupera as receitas salvas no Context, baseado no title (Meals ou Drinks)
  useEffect(() => {
    setRecipes(searchResponse[title.toLowerCase()]);
  }, [searchResponse]);

  const id = `id${title.replace('s', '')}`;

  return (
    <div className="recipesContainer">
      <ul className="recipesList">
        {
          recipes.map((recipe, index) => {
            if (index >= LAST_CARD) return null;
            return (
              <RecipeCard
                key={ recipe[id] }
                title={ title }
                recipe={ recipe }
                index={ index }
                recipesOrRecomm="recipes"
              />
            );
          })
        }
      </ul>
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
};
