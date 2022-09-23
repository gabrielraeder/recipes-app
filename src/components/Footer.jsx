import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../Styles/Footer.css';

export default function Footer() {
  const history = useHistory();

  return (
    <footer className="footer" data-testid="footer">
      <input
        type="image"
        alt="icone de bebida"
        src={ drinkIcon }
        onClick={ () => { history.push('/drinks'); } }
        data-testid="drinks-bottom-btn"
      />

      <input
        type="image"
        alt="icone de comida"
        src={ mealIcon }
        onClick={ () => { history.push('/meals'); } }
        data-testid="meals-bottom-btn"
      />
    </footer>
  );
}
