import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../Styles/DoneRecipes.css';
import { getSavedByKey } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneMeals, setDoneMeals] = useState([]);
  const [doneDrinks, setDoneDrinks] = useState([]);
  const [exhibit, setExhibit] = useState([]);

  useEffect(() => {
    const done = getSavedByKey('doneRecipes');
    setDoneRecipes(done);
    setExhibit(done);
    const meals = done.filter((recipe) => recipe.type === 'meal');
    setDoneMeals(meals);
    const drinks = done.filter((recipe) => recipe.type === 'drinks');
    setDoneDrinks(drinks);
  }, []);

  const handleClickFilter = ({ target: { value } }) => {
    setExhibit(value);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div className="donePageButtons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value={ doneRecipes }
          onClick={ handleClickFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value={ doneMeals }
          onClick={ handleClickFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value={ doneDrinks }
          onClick={ handleClickFilter }
        >
          Drinks
        </button>
        <ul>
          {exhibit.map((item, index) => (
            <li key={ item.id }>
              <Link to={ `/${item.type}s/${item.id}` }>
                <img
                  src={ item.image }
                  alt={ item.name }
                  className="recipeIMG"
                  data-testid={ `${index}-horizontal-image` }
                />
                <h4
                  className="recipeName"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { item.name }
                </h4>
                <h5
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { item.category }
                </h5>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {item.doneDate }
                </p>
              </Link>
              <input
                type="image"
                alt="shareIcon"
                className="shareIcon"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                // onClick={ copyToClipBoard }
              />
              { item.tags.length > 0 && (
                <ul>
                  {item.tags.map((tag, ind) => (
                    <li key={ ind } data-testid={ `${index}-${tag}-horizontal-tag` }>
                      { tag }
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

// <Link to={ `/${title.toLowerCase()}/${id}` }>
//       <li className="recipeCard" data-testid={ titleID }>
//         <img
//           src={ recipe[thumb] }
//           alt={ recipe[string] }
//           className="recipeIMG"
//           data-testid={ `${index}-card-img` }
//         />
//         <h4
//           className="recipeName"
//           data-testid={ nameID }
//         >
//           { recipe[string] }
//         </h4>
//       </li>
//     </Link>
