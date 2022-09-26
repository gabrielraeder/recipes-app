// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import App from '../App';
import renderPath from './helpers/RenderWithRouter';

const meals = require('../../cypress/mocks/meals');
const drinks = require('../../cypress/mocks/drinks');
const mealCategories = require('../../cypress/mocks/mealCategories');
const drinkCategories = require('../../cypress/mocks/drinkCategories');

describe('Footer Header Component', () => {
  it('Test if when the user clicks on the meals icon it redirects to "/meals" ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(drinks),
    });

    const { history } = renderPath('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeDisabled();

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
    act(() => {
      userEvent.click(drinksIcon);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(history.location.pathname).toBe('/drinks');
  });
});

describe('Footer Header Component', () => {
  it('Test if when the user clicks on the drinks icon it redirects to "/drinks" ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(meals),
    });

    const { history } = renderPath('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeDisabled();

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();

    act(() => {
      userEvent.click(mealsIcon);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(history.location.pathname).toBe('/meals');
  });
});
