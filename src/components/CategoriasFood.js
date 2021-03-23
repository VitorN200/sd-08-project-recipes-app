import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function CategoriasFood() {
  const { foodCategory, directRequestFood,
    setIsDrinkLoading, setMeals } = useContext(RecipeContext);
  const MIN_ELEMN = 5;

  const fetchCategory = async (value) => {
    setIsDrinkLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
    const result = await response.json();
    setMeals(result.meals);
    setIsDrinkLoading(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => directRequestFood() }
      >
        All
      </button>
      {foodCategory.map((elem, index) => {
        if (index < MIN_ELEMN) {
          return (
            <button
              data-testid={ `${elem.strCategory}-category-filter` }
              type="button"
              value={ elem.strCategory }
              onClick={ ({ target }) => fetchCategory(target.value) }
              key={ elem.strCategory }
            >
              {elem.strCategory}
            </button>);
        }
        return '';
      })}
    </div>
  );
}

export default CategoriasFood;
