import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderWithRouter';
import doneRecipes from './mocks/doneRecipesMock';

const localStorage = require('../services/localStorage');

const path = '/done-recipes';

describe('Done Recipes tests', () => {
  it('Tests finding buttons', () => {
    // localStorage.getSavedByKey = jest.fn().mockReturnValue(doneRecipes);

    renderPath(path);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Meals' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Drinks' })).toBeInTheDocument();
  });

  it('Tests localStorage recover and showing cards on screen', () => {
    localStorage.getSavedByKey = jest.fn().mockReturnValue(doneRecipes);

    renderPath(path);

    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });
});

describe('Done recipes filters', () => {
  it('clicks on Meals filter', () => {
    localStorage.getSavedByKey = jest.fn().mockReturnValue(doneRecipes);
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    renderPath(path);
    const drinkImage = screen.getByTestId('1-horizontal-image');
    expect(drinkImage).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Meals' }));

    expect(drinkImage).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  it('clicks on Drinks filter then on All filter', () => {
    localStorage.getSavedByKey = jest.fn().mockReturnValue(doneRecipes);
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    renderPath(path);
    const mealName = screen.getByTestId('0-horizontal-name');
    expect(mealName).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Drinks' }));

    expect(mealName).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'All' }));

    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
  });
});
