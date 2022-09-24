import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

export default function Meals() {
  return (
    <div className="home">
      <Header title="Meals" />
      <RecipesList title="Meals" />
      <Footer />
    </div>
  );
}
