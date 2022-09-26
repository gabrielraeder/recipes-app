// faz o parse dos itens recuperados
const readSpecificKey = (key) => JSON.parse(localStorage.getItem(key));

// salva itens no localStorage
const saveToLocalStorage = (key, value) => localStorage
  .setItem(key, JSON.stringify(value));

// recebe produto e atualiza o localStorage com ARRAY
export const AddToDoneOrFavorites = (key, value) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify([]));
  }
  const saved = readSpecificKey(key);
  saveToLocalStorage(key, [...saved, value]);
};

export const addInProgressDrinks = (id, value) => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {},
      meals: {},
    }));
  }
  const saved = readSpecificKey('inProgressRecipes');
  const toReturn = {
    drinks: { ...saved.drinks, id: value },
    meals: { ...saved.meals },
  };
  saveToLocalStorage('inProgressRecipes', toReturn);
};

export const addInProgressMeals = (id, value) => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {},
      meals: {},
    }));
  }
  const saved = readSpecificKey('inProgressRecipes');
  const toReturn = {
    drinks: { ...saved.drinks },
    meals: { ...saved.meals, id: value },
  };
  saveToLocalStorage('inProgressRecipes', toReturn);
};

// recupera produtos do localStorage
export const getSavedByKey = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify([]));
  }
  const savedOnKey = readSpecificKey(key);
  return savedOnKey;
};
