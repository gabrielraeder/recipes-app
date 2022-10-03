import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import { fetchSearchBar } from '../services/fetchAPI';
import '../Styles/SearchBar.css';
import { getSavedByKey } from '../services/localStorage';

export default function SearchBar({ title }) {
  const [textInput, setTextInput] = useState('');
  const [radioInput, setRadioInput] = useState('i');

  const history = useHistory();

  const { setSearchResponse } = useContext(Context);

  const handleChange = (value, callback) => callback(value);

  const myRecipesRecover = () => {
    const myRecipes = getSavedByKey('myRecipes');
    const usersSearch = myRecipes.some((i) => i.user.email.includes(textInput));
    if (myRecipes.length === 0 || !usersSearch) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }
    const user = myRecipes.filter((i) => i.user.email.includes(textInput));
    const mapped = user.map((i) => {
      if (i.type === 'meal') {
        return ({
          strMeal: i.name,
          strMealThumb: i.image,
          idMeal: i.id,
          strCategory: i.category,
          strArea: i.nationality,
        });
      }
      return ({
        strDrink: i.name,
        strDrinkThumb: i.image,
        idDrink: i.id,
        strCategory: i.category,
        strArea: i.nationality,
      });
    });
    const drinks = mapped.filter((i) => i.strDrink);
    const meals = mapped.filter((i) => i.strMeal);
    const save = { meals, drinks };
    setSearchResponse(save);
  };

  // fetch baseado nos states e no title, onde title define se pesquisará na API de bebidas o comidas
  // condicional 1: se o retorno da API é nulo retorna um alerta
  // condicional 2: se o retorno da API possui 1 receita somente, encaminha para página de tal receita
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

  // condicional: se buscar por primeira letra, digitando mais de uma letra, um alerta é exibido.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textInput.length > 1 && radioInput === 'f') {
      global.alert('Your search must have only 1 (one) character');
      return null;
    }
    if (radioInput !== 'userSearch') fetchMeals();
    else myRecipesRecover();
  };

  return (
    <form className="searchContainer" onSubmit={ handleSubmit }>
      <input
        className="searchInput"
        type="text"
        data-testid="search-input"
        value={ textInput }
        onChange={ ({ target: { value } }) => (handleChange(value, setTextInput)) }
      />
      <br />
      <div className="filtersContainer">

        <div className="searchFilters">
          <label htmlFor="ingredient" className="ingredientLabel">
            <input
              name="radios"
              className="ingredientInput"
              id="ingredient"
              value="i"
              type="radio"
              data-testid="ingredient-search-radio"
              checked={ radioInput === 'i' }
              onChange={ ({ target: { value } }) => (handleChange(value, setRadioInput)) }
            />
            Ingredient
          </label>

          <label htmlFor="name" className="nameLabel">
            <input
              name="radios"
              className="nameInput"
              id="name"
              value="s"
              type="radio"
              data-testid="name-search-radio"
              checked={ radioInput === 's' }
              onChange={ ({ target: { value } }) => (handleChange(value, setRadioInput)) }
            />
            Name
          </label>
          <label htmlFor="firstletter" className="firstLabel">
            <input
              name="radios"
              className="firstInput"
              id="firstletter"
              value="f"
              type="radio"
              data-testid="first-letter-search-radio"
              checked={ radioInput === 'f' }
              onChange={ ({ target: { value } }) => (handleChange(value, setRadioInput)) }
            />
            First letter
          </label>
          <label htmlFor="userSearch" className="firstLabel">
            <input
              name="radios"
              className="firstInput"
              id="userSearch"
              value="userSearch"
              type="radio"
              checked={ radioInput === 'userSearch' }
              onChange={ ({ target: { value } }) => (handleChange(value, setRadioInput)) }
            />
            User Search
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
