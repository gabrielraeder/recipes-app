import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderWithRouter';

const localStorage = require('../services/localStorage');

const path = '/profile';

const email = 'eu@trybe.com';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Profile page', () => {
  it('checks for email and clicks done recipes', () => {
    jest.spyOn(localStorage, 'saveToLocalStorage');
    localStorage.saveToLocalStorage('user', { email });

    const { history } = renderPath(path);
    expect(screen.getByText(email)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('profile-done-btn'));

    expect(history.location.pathname).toBe('/done-recipes');
  });
});

describe('Profile page', () => {
  it('clicks favorite recipes', () => {
    jest.spyOn(localStorage, 'saveToLocalStorage');
    localStorage.saveToLocalStorage('user', { email });

    const { history } = renderPath(path);
    expect(screen.getByText(email)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('profile-favorite-btn'));

    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(screen.getByTestId('profile-top-btn'));

    userEvent.click(screen.getByTestId('profile-logout-btn'));

    expect(history.location.pathname).toBe('/');
  });
});

// describe('', () => {
//   it('', () => {
//   });
// });
