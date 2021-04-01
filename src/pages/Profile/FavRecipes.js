import React, { useState } from 'react';
import CardFavorites from '../../components/Card/CardFavorites';
import Header from '../../components/Header';

function FavRecipes() {
  const [filter, setFilter] = useState('');
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favorites);
  return (
    <div>
      <Header
        name="Receitas Favoritas"
        currentPage="Fav"
        icon="false"
      />
      <div className="filter-btn">
        <button type="button" onClick={ () => setFilter('') }>All</button>
        <button type="button" onClick={ () => setFilter('comida') }>Comidas</button>
        <button type="button" onClick={ () => setFilter('bebida') }>Bebidas</button>
      </div>
      <main>
        {
          favorites
            .filter((item) => {
              if (filter === '') return item;
              return item.type === filter;
            })
            .map((card) => {
              console.log('o item map', card);
              return (
                <CardFavorites
                  key={ card.id }
                  img={ card.image }
                  title={ card.name }
                  alt={ card.name }
                  desc={ card.type === 'bebidas' ? card.alcoholicOrNot
                    : `${card.category} - ${card.area}` }
                />
              );
            })
        }
      </main>
    </div>
  );
}

export default FavRecipes;
