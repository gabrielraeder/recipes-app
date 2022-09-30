import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderWithRouter';

const localStorage = require('../services/localStorage');

const OneMeal = require('../../cypress/mocks/oneMeal');
const drinks = require('../../cypress/mocks/drinks');

const path = '/meals/52771';
const startRecipeBtnID = 'start-recipe-btn';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Test Recipe Details page', () => {
  it.only('tests clicking on share button', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks).mockResolvedValueOnce(OneMeal),
    });

    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    renderPath(path);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    userEvent.click(screen.getByTestId('share-btn'));

    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    const start = screen.getByTestId(startRecipeBtnID);
    expect(start).toHaveTextContent('Start Recipe');
  });
});

describe('Test Recipe Details', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('tests continue button in meals page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks).mockResolvedValueOnce(OneMeal),
    });

    jest.spyOn(localStorage, 'addInProgressMeals');

    localStorage.addInProgressMeals(52771, ['penne rigate: 1 pound', 'olive oil: 1/4 cup']);

    renderPath(path);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const start = screen.getByTestId(startRecipeBtnID);
    expect(start).toHaveTextContent('Continue Recipe');
  });
});

describe('Test Recipe Details', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('tests continue button in drinks page', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks).mockResolvedValueOnce(OneMeal),
    });

    jest.spyOn(localStorage, 'addInProgressDrinks');

    localStorage.addInProgressDrinks(52771, ['penne rigate: 1 pound', 'olive oil: 1/4 cup']);

    renderPath(path);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const start = screen.getByTestId(startRecipeBtnID);
    expect(start).toHaveTextContent('Continue Recipe');
  });
});

describe('Test Recipe Details page', () => {
  it('tests clicking on Favorite button', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks).mockResolvedValueOnce(OneMeal),
    });

    const favs = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ];

    renderPath(path);

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
