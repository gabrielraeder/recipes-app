import React from 'react';
import propTypes from 'prop-types';

export default function FilterButtons({ handleClickFilter }) {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="All"
        onClick={ handleClickFilter }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ handleClickFilter }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ handleClickFilter }
      >
        Drinks
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  handleClickFilter: propTypes.func.isRequired,
};
