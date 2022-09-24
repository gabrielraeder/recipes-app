import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import { fetchSearchBar } from '../services/fetchAPI';

export default function SearchBar({ title }) {
  const [textInput, setTextInput] = useState('');
  const [radioInput, setRadioInput] = useState('i');

  const history = useHistory();

  const { setSearchResponse } = useContext(Context);

  const handerChange = (value, callback) => callback(value);

  const fetchMeals = async () => {
    if (textInput.length > 1 && radioInput === 'f') {
      global.alert('Your search must have only 1 (one) character');
      return null;
    }
    const response = await fetchSearchBar(textInput, radioInput, title);
    if (response[title.toLowerCase()].length === 1) {
      const id = response[title.toLowerCase()][0][`id${title.replace('s', '')}`];
      history.push(`/${title.toLowerCase()}/${id}`);
    }
    setSearchResponse(response);
    // switch (radioInput) {
    // case 'ingredient': {
    //   const response = await fetchIngredients(textInput, title);
    //   setSearchResponse(response);
    //   break;
    // }
    // case 'name': {
    //   const response = await fetchName(textInput, title);
    //   setSearchResponse(response);
    //   break;
    // }
    // default: {
    //   if (textInput.length > 1) {
    //     global.alert('Your search must have only 1 (one) character');
    //     break;
    //   }
    //   const response = await fetchFirstLetter(textInput, title);
    //   setSearchResponse(response);
    //   break;
    // }
    // }
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
          value="i"
          type="radio"
          data-testid="ingredient-search-radio"
          checked={ radioInput === 'i' }
          onChange={ ({ target: { value } }) => (handerChange(value, setRadioInput)) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          name="radios"
          id="name"
          value="s"
          type="radio"
          data-testid="name-search-radio"
          checked={ radioInput === 's' }
          onChange={ ({ target: { value } }) => (handerChange(value, setRadioInput)) }
        />
      </label>
      <label htmlFor="first letter">
        First letter
        <input
          name="radios"
          id="first letter"
          value="f"
          type="radio"
          data-testid="first-letter-search-radio"
          checked={ radioInput === 'f' }
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
