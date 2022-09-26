import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import { fetchThruCategory, fetchInitialItems } from '../services/fetchAPI';

export default function CategoryCard({ category, title }) {
  const { setSearchResponse } = useContext(Context);

  const [isFirstClick, setIsFirstClick] = useState(true);

  const handleCategoryFetch = async () => {
    const response = await fetchThruCategory(category.strCategory, title);
    setSearchResponse(response);
    setIsFirstClick(false);
  };

  const handleAllButton = async () => {
    const response = await fetchInitialItems(title);
    setSearchResponse(response);
    setIsFirstClick(true);
  };

  const names = category.strCategory.replace('/', ' ');
  return (
    <button
      type="button"
      className="categoryBtn"
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ isFirstClick ? handleCategoryFetch : handleAllButton }
    >
      {names}
    </button>
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
};
