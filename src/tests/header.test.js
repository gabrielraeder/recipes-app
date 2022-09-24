// import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import renderPath from './helpers/RenderWithRouter';

describe('Test Header Component', () => {
  it('Test Header', () => {
    const { history } = renderPath('/meals');

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    const searchIcon = screen.getByTestId('search-top-btn');
    const profileicon = screen.getByTestId('profile-top-btn');

    expect(searchIcon).toBeInTheDocument();
    expect(profileicon).toBeInTheDocument();

    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchIcon);
    expect(searchInput).not.toBeInTheDocument();

    userEvent.click(profileicon);

    expect(history.location.pathname).toBe('/profile');
  });
});
