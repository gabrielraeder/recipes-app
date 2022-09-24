import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import RecipeCard from './RecipeCard';

const LAST_CARD = 12;

export default function RecipesList({ title }) {
  const [recipes, setRecipes] = useState([]);

  const { searchResponse } = useContext(Context);

  useEffect(() => {
    setRecipes(searchResponse[title.toLowerCase()]);
  }, [searchResponse]);

  const id = `id${title.replace('s', '')}`;

  return (
    <div className="recipesContainer">
      {
        recipes.map((recipe, index) => {
          if (index >= LAST_CARD) return null;
          return (
            <RecipeCard
              key={ recipe[id] }
              title={ title }
              recipe={ recipe }
              index={ index }
            />
          );
        })
      }
    </div>
  );
}

RecipesList.propTypes = {
  title: PropTypes.string.isRequired,
};
