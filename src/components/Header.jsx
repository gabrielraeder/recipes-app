import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../Styles/Header.css';
import iconeRecipesapp from '../images/iconeRecipesapp.png';
import logoRecipesapp from '../images/logoRecipesapp.png';

export default function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);

  const showSearch = title === 'Meals' || title === 'Drinks';

  const showSearchBar = () => setSearchBar((prev) => !prev);

  return (
    <div className="headerContainer">
      <div className="header">

        <input
          type="image"
          alt="iconeRecipesapp"
          className="recipesIcon"
          src={ iconeRecipesapp }
        />
        <input
          type="image"
          alt="logoRecipesapp"
          className="recipesNameLogo"
          src={ logoRecipesapp }
        />
        <Link to="/profile">
          <input
            type="image"
            className="profileIcon"
            alt="profile"
            src={ profile }
            data-testid="profile-top-btn"
          />
        </Link>
        {showSearch && (
          <input
            type="image"
            className="searchIcon"
            alt="searchIcon"
            src={ searchIcon }
            onClick={ showSearchBar }
            data-testid="search-top-btn"
          />
        )}
      </div>
      {/* <input
        type="image"
        className="foodsIcon"
        alt="foods"
        src={ headIMG }
        data-testid="page-title"
      /> */}
      <h2
        className="foodsIcon"
        data-testid="page-title"
      >
        <strong>{ title }</strong>
      </h2>
      { searchBar && <SearchBar title={ title } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
