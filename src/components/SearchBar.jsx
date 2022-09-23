import React from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ title }) {
  console.log(title);
  return (
    <form>
      <input type="text" data-testid="search-input" />
      <br />
      <label htmlFor="ingredient">
        Ingredient
        <input
          id="ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          id="first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      <br />
      <button data-testid="exec-search-btn" type="submit">Search</button>
    </form>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};
