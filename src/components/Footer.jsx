import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../Styles/Footer.css';

export default function Footer({ title }) {
  const history = useHistory();
  const { setSearchResponse, setCategories } = useContext(Context);

  const handleClick = (page) => {
    setSearchResponse({ meals: [], drinks: [] });
    setCategories([]);
    history.push(`/${page}`);
  };

  return (
    <footer className="footer" data-testid="footer">
      <input
        type="image"
        alt="icone de bebida"
        src={ drinkIcon }
        onClick={ () => handleClick('drinks') }
        data-testid="drinks-bottom-btn"
        disabled={ title === 'Drinks' }
      />

      <input
        type="image"
        alt="icone de comida"
        src={ mealIcon }
        onClick={ () => handleClick('meals') }
        data-testid="meals-bottom-btn"
        disabled={ title === 'Meals' }
      />
    </footer>
  );
}

Footer.propTypes = {
  title: PropTypes.string.isRequired,
};
