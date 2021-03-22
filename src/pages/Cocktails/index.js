import React, { useContext } from 'react';

import RecipesContext from '../../context/RecipesContext';

import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import DrinkCard from '../../components/DrinkCard';

const LIMIT_OF_CARDS = 12;

function Cocktails() {
  const { drinks } = useContext(RecipesContext);

  return (
    <div>
      <Header title="Bebidas" />
      <SearchBar type="cocktails" />
      {drinks.map((drink, index) => {
        if (index < LIMIT_OF_CARDS) {
          return <DrinkCard key={ index } drink={ drink } />;
        }
        return null;
      })}
    </div>
  );
}

export default Cocktails;
