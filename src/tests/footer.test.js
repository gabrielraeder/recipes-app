// import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import renderPath from './helpers/RenderWithRouter';

describe('Footer Header Component', () => {
  it('Test if the footer had two icons for drinks and meals', () => {
    renderPath('/meals');

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('Test if when the user clicks on the meals icon it redirects to "/meals" ', () => {
    const { history } = renderPath('/meals');

    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    userEvent.click(mealsIcon);
    expect(history.location.pathname).toBe('/meals');
  });

  it('Test if when the user clicks on the drinks icon it redirects to "/drinks" ', () => {
    const { history } = renderPath('/meals');

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksIcon);
    expect(history.location.pathname).toBe('/drinks');
  });
});
