import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderWithRouter';
import favoriteMock from './mocks/favoriteRecipesMock';

const localStorage = require('../services/localStorage');

const path = '/favorite-recipes';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Favorite Recipes page load', () => {
  it('check if onload can find buttons', () => {
    renderPath(path);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Meals' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Drinks' })).toBeInTheDocument();
  });

  it('Tests localStorage recover and showing cards and clicking on heart', () => {
    const mockAfterClick = [{
      id: '52791',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];

    localStorage.getSavedByKey = jest.fn().mockReturnValue(mockAfterClick)
      .mockReturnValueOnce(favoriteMock);

    renderPath(path);
    const drinkImage = screen.getByTestId('1-horizontal-image');
    const drinkName = screen.getByText('Aquamarine');

    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(drinkImage).toBeInTheDocument();
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();

    userEvent.click(screen.getByTestId('1-horizontal-favorite-btn'));

    expect(drinkImage).not.toBeInTheDocument();
    expect(drinkName).not.toBeInTheDocument();
  });
});

describe('Favorite Recipes filter buttons', () => {
  it('test clicking filter buttons', () => {
    localStorage.getSavedByKey = jest.fn().mockReturnValue(favoriteMock);

    renderPath(path);
    const drinkName = screen.getByTestId('1-horizontal-name');
    expect(drinkName).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Meals' }));

    expect(drinkName).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    const mealImage = screen.getByTestId('0-horizontal-image');
    expect(mealImage).toBeInTheDocument();

    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Drinks' }));
    expect(mealImage).not.toBeInTheDocument();
  });
});

describe('Favorite Recipes Share button', () => {
  it('Tests share button meal card', () => {
    localStorage.getSavedByKey = jest.fn().mockReturnValue(favoriteMock);
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    renderPath(path);

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  it('Tests share button drink card', () => {
    localStorage.getSavedByKey = jest.fn().mockReturnValue(favoriteMock);
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    renderPath(path);

    userEvent.click(screen.getByTestId('1-horizontal-share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
