import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import CategoryCard from './CategoryCard';
import { fetchInitialItems } from '../services/fetchAPI';
import '../Styles/Categories.css';

const SLICE_CATEGORIES = 5;

export default function CategoriesList({ title }) {
  const { categories, setSearchResponse } = useContext(Context);

  const handleAllButton = async () => {
    const response = await fetchInitialItems(title);
    setSearchResponse(response);
  };

  const showFiveCategories = categories.slice(0, SLICE_CATEGORIES);

  return (
    <div className="categoriesBtnContainer">
      <button
        type="button"
        className="categoryBtn"
        data-testid="All-category-filter"
        onClick={ handleAllButton }
      >
        All
      </button>
      {
        showFiveCategories.map((cat, index) => (
          <CategoryCard
            key={ index }
            category={ cat }
            title={ title }
          />
        ))
      }
    </div>
  );
}

CategoriesList.propTypes = {
  title: PropTypes.string.isRequired,
};
