// import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderWithRouter';

describe('Tests Login Page', () => {
  it('', () => {
    const { history } = renderPath('/');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'gabriel@eu.com');
    expect(button).toBeDisabled();
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeEnabled();

    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
  });

  it('', () => {
    renderPath('/');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(passwordInput, '1234567');
    expect(button).toBeDisabled();
    userEvent.type(emailInput, 'gabrieleu.com');
    expect(button).toBeDisabled();
  });
});
