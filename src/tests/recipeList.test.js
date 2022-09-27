import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderPath from './helpers/RenderWithRouter';
import oneMealMock from './mocks/oneMealMock';

const localStorage = require('../services/localStorage');

const meals = require('../../cypress/mocks/meals');
const oneDrinkId15997 = require('../../cypress/mocks/oneDrinkId15997');
const drinks = require('../../cypress/mocks/drinks');
const mealCategories = require('../../cypress/mocks/mealCategories');
const drinkCategories = require('../../cypress/mocks/drinkCategories');
const cocoaDrinks = require('../../cypress/mocks/cocoaDrinks');
const cocktailDrinks = require('../../cypress/mocks/cocktailDrinks');
const beefMeals = require('../../cypress/mocks/beefMeals');

const allCategoriesID = 'All-category-filter';

describe('Tests Recipe list', () => {
  it('tests if renders twelve recipe cards', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories).mockResolvedValueOnce(meals),
    });

    renderPath('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const listItem = screen.getAllByRole('listitem');
    expect(listItem).toHaveLength(12);
  });
  it('tests if renders 6 category buttons', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories).mockResolvedValueOnce(meals),
    });

    renderPath('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId(allCategoriesID)).toBeDefined();
    expect(screen.getByTestId('Chicken-category-filter')).toBeDefined();
    expect(screen.getByTestId('Beef-category-filter')).toBeDefined();
    expect(screen.getByTestId('Breakfast-category-filter')).toBeDefined();
    expect(screen.getByTestId('Dessert-category-filter')).toBeDefined();
    expect(screen.getByTestId('Goat-category-filter')).toBeDefined();
  });
});

describe('Clicks Category buttons', () => {
  it('Tests first and second click on a category', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(cocoaDrinks),
    });

    renderPath('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByTestId(allCategoriesID)).toBeDefined();
    expect(screen.getByRole('button', { name: /ordinary drink/i })).toBeDefined();
    expect(screen.getByTestId('Cocktail-category-filter')).toBeDefined();
    expect(screen.getByTestId('Shake-category-filter')).toBeDefined();
    expect(screen.getByRole('button', { name: /other unknown/i })).toBeDefined();
    expect(screen.getByTestId('Cocoa-category-filter')).toBeDefined();

    const cocoaBtn = screen.getByTestId('Cocoa-category-filter');

    act(() => {
      userEvent.click(cocoaBtn);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getAllByRole('listitem')).toHaveLength(9);

    act(() => {
      userEvent.click(cocoaBtn);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getAllByRole('listitem')).toHaveLength(12);
  });
});

describe('Tests Clicking All Button on drinks page', () => {
  it('clicks on the all button after going to another category', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(cocktailDrinks),
    });

    renderPath('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    act(() => {
      userEvent.click(screen.getByTestId('Cocktail-category-filter'));
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(url));

    expect(screen.getAllByRole('listitem')).toHaveLength(12);

    act(() => {
      userEvent.click(screen.getByTestId(allCategoriesID));
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getAllByRole('listitem')).toHaveLength(12);
    expect(screen.getByRole('img', { name: /gg/i })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')[2].children[1]).toHaveTextContent('ABC');
  });
});

describe('Tests Clicking All Button on meals page', () => {
  it('clicks on the all button after going to another category', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(beefMeals),
    });

    renderPath('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    act(() => {
      userEvent.click(screen.getByTestId('Beef-category-filter'));
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getAllByRole('listitem')).toHaveLength(12);
    expect(screen.getByText('Beef Lo Mein')).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId(allCategoriesID));
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getAllByRole('listitem')).toHaveLength(12);
    expect(screen.getByText('Corba')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')[2].children[1]).toHaveTextContent('Dal fry');
  });
});

describe('Tests Clicking recipe card', () => {
  it('clicks the recipe card and redirects to /meals/52978', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(oneMealMock),
    });

    const { history } = renderPath('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const listItem = screen.getAllByRole('listitem');
    expect(listItem).toHaveLength(12);

    const card = screen.getByTestId('1-recipe-card');
    userEvent.click(card);

    expect(history.location.pathname).toBe('/meals/52978');
  });
});

describe('Test Recipe Details page', () => {
  it('tests clicking on Favorite button', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals).mockResolvedValueOnce(oneDrinkId15997),
    });

    const favs = [
      {
        id: '15997',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
    ];

    renderPath('/drinks/15997');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    userEvent.click(screen.getByTestId('favorite-btn'));

    jest.spyOn(localStorage, 'getSavedByKey');

    expect(localStorage.getSavedByKey('favoriteRecipes')).toEqual(favs);

    userEvent.click(screen.getByTestId('favorite-btn'));

    expect(localStorage.getSavedByKey('favoriteRecipes')).toEqual([]);
  });
});

// describe('', () => {
//   it('', () => {
//   });
// });
