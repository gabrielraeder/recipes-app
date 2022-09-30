import React, { useState, useEffect } from 'react';
import { getSavedByKey } from '../services/localStorage';
import FavoriteMealCard from '../components/FavoriteMealCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';

export default function MyRecipes() {
  const [myRecipes, SetMyRecipes] = useState([]);

  useEffect(() => {
    const storageRecipes = getSavedByKey('myRecipes');
    SetMyRecipes(storageRecipes);
  }, []);

  return (
    <div>
      {
        myRecipes.map((item, index) => {
          if (item?.type === 'meal') {
            return (
              <div key={ index }>
                <FavoriteMealCard item={ item } index={ index } />
              </div>
            );
          }
          return (
            <div key={ index }>
              <FavoriteDrinkCard item={ item } index={ index } />
            </div>
          );
        })
      }
    </div>
  );
}
