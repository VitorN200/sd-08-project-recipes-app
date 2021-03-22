import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesContextProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isShow, setIsShow] = useState(false);

  function setShow() {
    console.log('setShow em provider');
    const invert = !isShow;
    console.log(invert);
    setIsShow(invert);
  }

  const context = {
    meals,
    setMeals,
    drinks,
    setDrinks,
    setShow,
    isShow,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipesContextProvider;
