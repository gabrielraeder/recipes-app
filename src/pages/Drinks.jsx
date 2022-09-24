import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <RecipesList title="Drinks" />
      <Footer />
    </div>
  );
}
