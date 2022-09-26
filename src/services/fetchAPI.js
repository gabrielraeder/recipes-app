export const fetchInitialItems = async (title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';
  const url = `https://www.the${search}db.com/api/json/v1/1/search.php?s=`;
  const response = await fetch(url).then((resp) => resp.json()).then((data) => data);
  return response;
};

export const fetchSearchBar = async (value, radio, title) => {
  const drinkOrMeal = title === 'Meals' ? 'meal' : 'cocktail';
  const search = radio === 'i' ? 'filter' : 'search';
  const noSpace = value.replaceAll(' ', '+');
  const url = `https://www.the${drinkOrMeal}db.com/api/json/v1/1/${search}.php?${radio}=${noSpace}`;
  const response = await fetch(url).then((resp) => resp.json()).then((data) => data);
  return response;
};

export const fetchCategories = async (title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';
  const url = `https://www.the${search}db.com/api/json/v1/1/list.php?c=list`;
  const response = await fetch(url).then((resp) => resp.json()).then((data) => data);
  return response;
};

export const fetchThruCategory = async (category, title) => {
  const search = title === 'Meals' ? 'meal' : 'cocktail';
  const url = `https://www.the${search}db.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url).then((resp) => resp.json()).then((data) => data);
  return response;
};
