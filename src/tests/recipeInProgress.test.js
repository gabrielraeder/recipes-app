import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import oneDrink from '../../cypress/mocks/oneDrink';
import renderPath from './helpers/RenderWithRouter';
import oneMealMock from './mocks/oneMealMock';
import oneDrinkMock from './mocks/oneDrinkMock';

const OneMeal = require('../../cypress/mocks/oneMeal');

const pathInProgressMeal = '/meals/52771/in-progress';
const pathInProgressDrink = '/drinks/178319/in-progress';
const pathdoneRecipes = '/done-recipes';
const favButton = 'favorite-btn';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Recipe In Progress meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(OneMeal),
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('tests renderizing page elements', async () => {
    renderPath(pathInProgressMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(8);
    checkboxes.forEach((check) => {
      expect(check).not.toBeChecked();
    });
    expect(screen.getByRole('button', { name: /finish/i })).toBeDisabled();
  });

  it('tests clicking on checks and re-rendering page', async () => {
    const { history } = renderPath(pathInProgressMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    history.push('/profile');
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    history.push(pathInProgressMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const checks = screen.getAllByRole('checkbox');
    expect(checks).toHaveLength(8);
    expect(checks[0]).toBeChecked();
    expect(checks[1]).toBeChecked();
    checks.forEach((check, i) => {
      if (i > 1) userEvent.click(check);
      expect(check).toBeChecked();
    });
    expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
    userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(history.location.pathname).toBe(pathdoneRecipes);
  });
});

describe('Recipe In Progress meals', () => {
  it('tests no tags option on meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMealMock),
    });
    const { history } = renderPath(pathInProgressMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const checks = screen.getAllByRole('checkbox');
    expect(checks).toHaveLength(8);
    checks.forEach((check) => {
      userEvent.click(check);
      expect(check).toBeChecked();
    });
    expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
    userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(history.location.pathname).toBe(pathdoneRecipes);
  });
});

describe('Recipe In Progress drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('tests renderizing page elements for drinks', async () => {
    renderPath(pathInProgressDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    checkboxes.forEach((check) => {
      expect(check).not.toBeChecked();
    });
    expect(screen.getByRole('button', { name: /finish/i })).toBeDisabled();
  });

  it('tests clicking on checks and re-rendering page for drinks', async () => {
    const { history } = renderPath(pathInProgressDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[1]);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    history.push('/profile');
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    history.push(pathInProgressDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const checks = screen.getAllByRole('checkbox');
    expect(checks).toHaveLength(3);
    expect(checks[0]).toBeChecked();
    expect(checks[1]).toBeChecked();
    checks.forEach((check, i) => {
      if (i > 1) userEvent.click(check);
      expect(check).toBeChecked();
    });
    expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
    userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(history.location.pathname).toBe(pathdoneRecipes);
  });
});

describe('Recipe In Progress drinks', () => {
  it('tests tags option on drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkMock),
    });
    const { history } = renderPath(pathInProgressDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const checks = screen.getAllByRole('checkbox');
    expect(checks).toHaveLength(3);
    checks.forEach((check) => {
      userEvent.click(check);
      expect(check).toBeChecked();
    });
    expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
    userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(history.location.pathname).toBe(pathdoneRecipes);
  });
});

describe('Test Recipe inProgress page', () => {
  it('tests clicking on share button', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(OneMeal),
    });

    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    renderPath(pathInProgressMeal);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    userEvent.click(screen.getByTestId('share-btn'));

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});

describe('Test Recipe inProgress page Favorite button clicks', () => {
  it('tests clicking on fav button meal', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(OneMeal),
    });

    const { history } = renderPath(pathInProgressMeal);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    userEvent.click(screen.getByTestId(favButton));

    expect(screen.getByRole('button', { name: /blackheart/i })).toBeInTheDocument();

    history.push(pathdoneRecipes);
    history.push(pathInProgressMeal);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const blackHeart = screen.getByRole('button', { name: /blackheart/i });
    expect(blackHeart).toBeInTheDocument();

    userEvent.click(screen.getByTestId(favButton));
    expect(blackHeart).toHaveProperty('src', 'http://localhost/meals/52771/whiteHeartIcon.svg');
  });

  it('tests clicking on fav button drink', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    const { history } = renderPath(pathInProgressDrink);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    userEvent.click(screen.getByTestId(favButton));

    expect(screen.getByRole('button', { name: /blackheart/i })).toBeInTheDocument();

    history.push(pathdoneRecipes);
    history.push(pathInProgressDrink);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const blackHeart = screen.getByRole('button', { name: /blackheart/i });
    expect(blackHeart).toBeInTheDocument();

    userEvent.click(screen.getByTestId(favButton));
    expect(blackHeart).toHaveProperty('src', 'http://localhost/drinks/178319/whiteHeartIcon.svg');
  });
});
