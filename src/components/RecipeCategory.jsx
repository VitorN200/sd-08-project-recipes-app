import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import '../styles/RecipeList.css';

const FIRST_FIVE_CATEGORY = 5;

export default function RecipeCategory({ recipeType }) {
  const {
    isFetching,
    apiReturnCategory,
    requestApiCategory,
    onClickCategoryFetch,
    setToggle,
  } = useContext(Context);

  useEffect(() => {
    requestApiCategory();
  }, []);

  function setType(type) {
    const [{ meals }, { drinks }] = apiReturnCategory;
    const typeCategory = type === 'meals' ? meals : drinks;
    const endpoint = type === 'meals' ? 'themealdb' : 'thecocktaildb';
    return Object.values(typeCategory)
      .slice(0, FIRST_FIVE_CATEGORY)
      .map((category) => (
        <button
          type="button"
          key={ `${category.strCategory}` }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => {
            onClickCategoryFetch(endpoint, category.strCategory);
            setToggle((prevToggle) => !prevToggle);
          } }
        >
          {category.strCategory}
        </button>
      ));
  }

  function renderCategory() {
    return <section>{setType(recipeType)}</section>;
  }

  return isFetching ? <p>Loading...</p> : renderCategory();
}

RecipeCategory.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
