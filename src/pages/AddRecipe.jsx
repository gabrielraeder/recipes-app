import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addMyNewRecipe } from '../services/localStorage';

export default function AddRecipe() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('meal');
  const [ingredient, setIngredient] = useState('');
  const [measure, setMeasure] = useState('');
  const [image, setImage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [nationality, setNation] = useState('');
  const [alcoholic, setAlcohol] = useState(false);
  const [ingredientsList, setIngredientsList] = useState({});
  const [numberOfIngredients, setNumberOfIngredients] = useState(1);

  const history = useHistory();

  const handleChange = (value, callback) => callback(value);
  const handleCheck = (checked, callback) => callback(checked);

  const AddIngredients = () => {
    setIngredientsList((prev) => {
      if (!ingredient || !measure) return ({ ...prev });
      return ({
        ...prev,
        [ingredient]: measure,
      });
    });
  };

  const addIngredientField = () => {
    setNumberOfIngredients((prev) => prev + 1);
    AddIngredients();
  };
  const removeIngredientField = () => {
    setNumberOfIngredients((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const submitRecipe = (e) => {
    e.preventDefault();
    const newRecipe = {
      type,
      nationality: type === 'meal' ? nationality : '',
      category,
      alcoholicOrNot: alcoholic ? 'Alcoholic' : '',
      name,
      image,
      ingredientsList,
      instructions,
    };

    console.log(newRecipe);
    addMyNewRecipe(newRecipe);
    history.push('/profile');
  };

  return (
    <form onSubmit={ submitRecipe }>
      <label htmlFor="radio1">
        <input
          type="radio"
          id="radio1"
          name="meal"
          value="meal"
          checked={ type === 'meal' }
          onChange={ ({ target: { value } }) => (handleChange(value, setType)) }
        />
        Meal
      </label>
      <label htmlFor="radio2">
        <input
          type="radio"
          id="radio2"
          name="drink"
          value="drink"
          checked={ type === 'drink' }
          onChange={ ({ target: { value } }) => (handleChange(value, setType)) }
        />
        Drink
      </label>

      <br />

      <label htmlFor="recipeName">
        <input
          type="text"
          placeholder="Recipe Name"
          id="recipeName"
          name="name"
          value={ name }
          onChange={ ({ target: { value } }) => (handleChange(value, setName)) }
        />
      </label>
      <label htmlFor="categoryName">
        <input
          type="text"
          placeholder="Recipe Category"
          id="categoryName"
          name="category"
          value={ category }
          onChange={ ({ target: { value } }) => (handleChange(value, setCategory)) }
        />
      </label>
      <div>
        { [...Array(numberOfIngredients).keys()].map((index) => (
          <div key={ index }>
            <input
              type="text"
              placeholder="Ingredient"
              onChange={ ({ target: { value } }) => (handleChange(value, setIngredient)) }
            />
            <input
              type="text"
              placeholder="Measure"
              onChange={ ({ target: { value } }) => (handleChange(value, setMeasure)) }
            />
          </div>
        ))}
        <button type="button" onClick={ removeIngredientField }>-</button>
        <button type="button" onClick={ addIngredientField }>+</button>
      </div>
      <textarea
        name="instructions"
        id="instructions"
        placeholder="Instructions"
        cols="30"
        rows="5"
        value={ instructions }
        onChange={ ({ target: { value } }) => (handleChange(value, setInstructions)) }
      />
      <label htmlFor="image">
        <input
          type="text"
          placeholder="Recipe image"
          id="image"
          name="image"
          value={ image }
          onChange={ ({ target: { value } }) => (handleChange(value, setImage)) }
        />
      </label>
      {
        type === 'drink' ? (
          <label htmlFor="alcoholic">
            <input
              type="checkbox"
              name="alcoholic"
              id="alcoholic"
              checked={ alcoholic }
              onChange={ ({ target: { checked } }) => (handleCheck(checked, setAlcohol)) }
            />
            Alcoholic?
          </label>
        ) : (
          <label htmlFor="nationality">
            <input
              type="text"
              placeholder="Nationality"
              id="nationality"
              name="nationality"
              value={ nationality }
              onChange={ ({ target: { value } }) => (handleChange(value, setNation)) }
            />
          </label>
        )
      }

      <button type="submit">Add recipe</button>
      <button type="reset">reset</button>
    </form>
  );
}
