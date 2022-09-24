export const fetchIngredients = async (value, title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';
  const url = `https://www.the${search}db.com/api/json/v1/1/filter.php?i=${value}`;
  const response = await fetch(url).then((resp) => resp.json()).then((data) => data);
  return response;
};

export const fetchName = async (value, title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';
  const url = `https://www.the${search}db.com/api/json/v1/1/search.php?s=${value}`;
  const response = await fetch(url).then((resp) => resp.json()).then((data) => data);
  return response;
};

export const fetchSearchBar = async (value, radio, title) => {
  const drinkOrMeal = title === 'Meals' ? 'meal' : 'cocktail';
  const search = radio === 'i' ? 'filter' : 'search';
  const url = `https://www.the${drinkOrMeal}db.com/api/json/v1/1/${search}.php?${radio}=${value}`;
  const response = await fetch(url).then((resp) => resp.json()).then((data) => data);
  return response;
};
