import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import { fetchSearchBar } from '../services/fetchAPI';
import '../Styles/SearchBar.css';

export default function SearchBar({ title }) {
  const [textInput, setTextInput] = useState('');
  const [radioInput, setRadioInput] = useState('i');

  const history = useHistory();

  const { setSearchResponse } = useContext(Context);

  const handerChange = (value, callback) => callback(value);

  const fetchMeals = async () => {
    const response = await fetchSearchBar(textInput, radioInput, title);
    if (response[title.toLowerCase()] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }
    if (response[title.toLowerCase()].length === 1) {
      const id = response[title.toLowerCase()][0][`id${title.replace('s', '')}`];
      history.push(`/${title.toLowerCase()}/${id}`);
    }
    setSearchResponse(response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textInput.length > 1 && radioInput === 'f') {
      global.alert('Your search must have only 1 (one) character');
      return null;
    }
    fetchMeals();
  };

  return (
    <form className="searchContainer" onSubmit={ handleSubmit }>
      <input
        className="searchInput"
        type="text"
        data-testid="search-input"
        value={ textInput }
        onChange={ ({ target: { value } }) => (handerChange(value, setTextInput)) }
      />
      <br />
      <div className="filtersContainer">

        <div className="searchFilters">
          <label htmlFor="ingredient" className="ingredientLabel">
            Ingredient
            <input
              name="radios"
              className="ingredientInput"
              id="ingredient"
              value="i"
              type="radio"
              data-testid="ingredient-search-radio"
              checked={ radioInput === 'i' }
              onChange={ ({ target: { value } }) => (handerChange(value, setRadioInput)) }
            />
          </label>

          <label htmlFor="name" className="nameLabel">
            Name
            <input
              name="radios"
              className="nameInput"
              id="name"
              value="s"
              type="radio"
              data-testid="name-search-radio"
              checked={ radioInput === 's' }
              onChange={ ({ target: { value } }) => (handerChange(value, setRadioInput)) }
            />
          </label>
          <label htmlFor="firstletter" className="firstLabel">
            First letter
            <input
              name="radios"
              className="firstInput"
              id="firstletter"
              value="f"
              type="radio"
              data-testid="first-letter-search-radio"
              checked={ radioInput === 'f' }
              onChange={ ({ target: { value } }) => (handerChange(value, setRadioInput)) }
            />
          </label>
          <br />
        </div>
        <button
          className="searchButton"
          data-testid="exec-search-btn"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};
