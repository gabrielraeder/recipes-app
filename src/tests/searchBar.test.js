// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderPath from './helpers/RenderWithRouter';
import ingredientMock from './mocks/ingredientMock';

const searchInputTestId = 'search-input';
const execSearchtestId = 'exec-search-btn';
const firstLetterTestId = 'first-letter-search-radio';
const ingredientTestId = 'ingredient-search-radio';
const nameTestId = 'name-search-radio';

describe('Test SeachBar for meals', () => {
  it('Test Searching for ingredient', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientMock),
    });

    renderPath('/meals');
    const searchButton = screen.getByRole('button');

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(ingredientTestId));
    expect(screen.getByTestId(ingredientTestId)).toBeTruthy();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('Test Searching for name', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientMock),
    });

    renderPath('/meals');
    const searchButton = screen.getByRole('button');

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(nameTestId));
    expect(screen.getByTestId(nameTestId)).toBeTruthy();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});

describe('', () => {
  it('Test Searching for firstletter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientMock),
    });

    renderPath('/meals');
    const searchButton = screen.getByRole('button');

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'm');
    expect(searchInput).toHaveValue('m');

    userEvent.click(screen.getByTestId(firstLetterTestId));
    expect(screen.getByTestId(firstLetterTestId)).toBeTruthy();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});

describe('', () => {
  it('', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientMock),
    });

    jest.spyOn(global, 'alert');
    global.fetch.mockResolvedValue('alerta');

    renderPath('/meals');
    const searchButton = screen.getByRole('button');

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(firstLetterTestId));
    expect(screen.getByTestId(firstLetterTestId)).toBeTruthy();

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
describe('Test SeachBar for drinks', () => {
  it('Test Searching for ingredient', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientMock),
    });

    renderPath('/drinks');
    const searchButton = screen.getByRole('button');

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(ingredientTestId));
    expect(screen.getByTestId(ingredientTestId)).toBeTruthy();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('Test Searching for name', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientMock),
    });

    renderPath('/drinks');
    const searchButton = screen.getByRole('button');

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'milk');
    expect(searchInput).toHaveValue('milk');

    userEvent.click(screen.getByTestId(nameTestId));
    expect(screen.getByTestId(nameTestId)).toBeTruthy();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});

describe('drinks', () => {
  it('Test Searching for firstletter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientMock),
    });

    renderPath('/drinks');
    const searchButton = screen.getByRole('button');

    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(searchInputTestId);

    userEvent.type(searchInput, 'm');
    expect(searchInput).toHaveValue('m');

    userEvent.click(screen.getByTestId(firstLetterTestId));
    expect(screen.getByTestId(firstLetterTestId)).toBeTruthy();

    act(() => {
      userEvent.click(screen.getByTestId(execSearchtestId));
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});
