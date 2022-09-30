import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import sinaldemais from '../images/sinaldemais.png';
import '../Styles/Footer.css';

export default function Footer({ title }) {
  const history = useHistory();
  const { setSearchResponse, setCategories } = useContext(Context);

  // reseta os estados globais searchresponse e Categories para trocar para a pagina entre meals e drinks
  // sem esse reset ocorre erro na aplicação
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
        className="plusIcon"
        alt="icone de adição"
        src={ sinaldemais }
        onClick={ () => history.push('/add-recipe') }
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
