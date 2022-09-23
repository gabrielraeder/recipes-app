import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import { fetchIngredients, fetchName, fetchFirstLetter } from '../services/fetchAPI';

export default function SearchBar({ title }) {
  const [textInput, setTextInput] = useState('');
  const [radioInput, setRadioInput] = useState('');

  const { setSearchResponse } = useContext(Context);

  const handerChange = (value, callback) => callback(value);

  const fetchMeals = async () => {
    switch (radioInput) {
    case 'ingredient': {
      const response = await fetchIngredients(textInput, title);
      setSearchResponse(response);
      break;
    }
    case 'name': {
      const response = await fetchName(textInput, title);
      setSearchResponse(response);
      break;
    }
    default: {
      if (textInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      const response = await fetchFirstLetter(textInput, title);
      setSearchResponse(response);
      break;
    }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMeals();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="search-input"
        value={ textInput }
        onChange={ ({ target: { value } }) => (handerChange(value, setTextInput)) }
      />
      <br />
      <label htmlFor="ingredient">
        Ingredient
        <input
          name="radios"
          id="ingredient"
          value="ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          onChange={ ({ target: { value } }) => (handerChange(value, setRadioInput)) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          name="radios"
          id="name"
          value="name"
          type="radio"
          data-testid="name-search-radio"
          onChange={ ({ target: { value } }) => (handerChange(value, setRadioInput)) }
        />
      </label>
      <label htmlFor="first letter">
        First letter
        <input
          name="radios"
          id="first letter"
          value="first letter"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ ({ target: { value } }) => (handerChange(value, setRadioInput)) }
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
