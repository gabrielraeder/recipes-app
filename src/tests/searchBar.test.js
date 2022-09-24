// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderPath from './helpers/RenderWithRouter';
import oneMealMock from './mocks/oneMealMock';
import oneDrinkMock from './mocks/oneDrinkMock';
import { emptyMeals } from './mocks/emptyMock';
import mealsMock from './mocks/mealsMock';

const testForMeals = 'Test SearchBar for meals';

const searchInputTestId = 'search-input';
const execSearchtestId = 'exec-search-btn';
const firstLetterTestId = 'first-letter-search-radio';
const ingredientTestId = 'ingredient-search-radio';
const nameTestId = 'name-search-radio';
const searchBtnId = 'search-top-btn';
const alert = 'Sorry, we haven\'t found any recipes for these filters.';

describe(testForMeals, () => {
  it('Test Searching for ingredient and routing to page /meals/52771', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMealMock),
    });

    const { history } = renderPath('/meals');
    const searchButton = screen.getByTestId(searchBtnId);

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(nameTestId));

    userEvent.click(screen.getByTestId(ingredientTestId));
    expect(screen.getByTestId(ingredientTestId)).toBeChecked();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/meals/52771');
  });
});

describe(testForMeals, () => {
  it('Test Searching for name', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMock),
    });

    renderPath('/meals');
    const searchButton = screen.getByTestId(searchBtnId);

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(nameTestId));
    expect(screen.getByTestId(nameTestId)).toBeChecked();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
  });
});

describe(testForMeals, () => {
  it('Test Searching for firstletter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMealMock),
    });

    renderPath('/meals');
    const searchButton = screen.getByTestId(searchBtnId);

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'm');
    expect(searchInput).toHaveValue('m');

    userEvent.click(screen.getByTestId(firstLetterTestId));
    expect(screen.getByTestId(firstLetterTestId)).toBeChecked();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});

describe('Tests global alert', () => {
  it('test global alert for 1 letter search', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMealMock),
    });

    jest.spyOn(global, 'alert');
    global.alert.mockResolvedValue('alerta');

    renderPath('/meals');
    const searchButton = screen.getByTestId(searchBtnId);

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(firstLetterTestId));
    expect(screen.getByTestId(firstLetterTestId)).toBeChecked();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});

// describe('', () => {
//   it('', () => {
//   });
// });
describe('Test SearchBar for drinks', () => {
  it('Test Searching for ingredient, and routing to page /drinks/178319', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkMock),
    });

    const { history } = renderPath('/drinks');
    const searchButton = screen.getByTestId(searchBtnId);

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(ingredientTestId));
    expect(screen.getByTestId(ingredientTestId)).toBeChecked();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Test Searching for name', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkMock),
    });

    renderPath('/drinks');
    const searchButton = screen.getByTestId(searchBtnId);

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(nameTestId));
    expect(screen.getByTestId(nameTestId)).toBeChecked();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});

describe('Test SearchBar for drinks', () => {
  it('Test Searching for firstletter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkMock),
    });

    renderPath('/drinks');
    const searchButton = screen.getByTestId(searchBtnId);

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'm');
    expect(searchInput).toHaveValue('m');

    userEvent.click(screen.getByTestId(firstLetterTestId));
    expect(screen.getByTestId(firstLetterTestId)).toBeChecked();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});

describe('Tests global alert', () => {
  it('alerts that no Meals recipes were found', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(emptyMeals),
    });

    jest.spyOn(global, 'alert');
    global.alert.mockResolvedValue('alerta');

    renderPath('/meals');
    const searchButton = screen.getByTestId(searchBtnId);

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'apple');
    expect(searchInput).toHaveValue('apple');

    userEvent.click(screen.getByTestId(ingredientTestId));
    expect(screen.getByTestId(ingredientTestId)).toBeChecked();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith(alert));
  });
});
