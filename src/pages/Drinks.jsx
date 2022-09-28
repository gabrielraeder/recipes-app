import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import CategoriesList from '../components/CategoriesList';
import { fetchInitialItems, fetchCategories } from '../services/fetchAPI';

export default function Drinks() {
  const { setSearchResponse, setCategories } = useContext(Context);

  // fetch das receitas iniciais para exibir na tela
  useEffect(() => {
    const initialFetch = async () => {
      const response = await fetchInitialItems('Drinks');
      setSearchResponse(response);
    };
    initialFetch();
  }, []);

  // fetch das categorias para colocar os botões na tela
  useEffect(() => {
    const categoriesFetch = async () => {
      const { drinks } = await fetchCategories('Drinks');
      setCategories(drinks);
    };
    categoriesFetch();
  }, []);

  return (
    <div className="home">
      <Header title="Drinks" />
      <CategoriesList title="Drinks" />
      <Recipes title="Drinks" />
      <Footer title="Drinks" />
    </div>
  );
}
