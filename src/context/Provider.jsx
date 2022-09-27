import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [searchResponse, setSearchResponse] = useState({ meals: [], drinks: [] });
  const [categories, setCategories] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState({});

  const context = {
    searchResponse,
    categories,
    recipeInProgress,
    setSearchResponse,
    setCategories,
    setRecipeInProgress,
  };

  return (
    <Context.Provider value={ context }>{ children }</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
