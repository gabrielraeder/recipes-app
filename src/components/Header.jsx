import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);

  const showSearch = title === 'Meals' || title === 'Drinks';

  const showSearchBar = () => setSearchBar((prev) => !prev);

  return (
    <div>
      <Link to="/profile">
        <i data-testid="profile-top-btn" src={ profile }>
          <img src={ profile } alt="profile" />
        </i>
      </Link>
      {showSearch && (
        <i data-testid="search-top-btn" src={ searchIcon }>
          <button type="button" onClick={ showSearchBar }>
            <img src={ searchIcon } alt="profile" />
          </button>
        </i>)}
      <h2 data-testid="page-title">{ title }</h2>
      <div>
        { searchBar && <SearchBar title={ title } />}
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
