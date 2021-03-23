import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import { filterFirstLetter, filterIngredient, filterName } from '../services/api';

export const FoodCtx = createContext();

function ContextFood(props) {
  const { children } = props;
  const [foodApi, setFoodApi] = useState([]);
  const [drinkApi, setDrinkApi] = useState([]);
  const [filter, setFilter] = useState({ key: 'name', value: 'be' });
  const [currentPage, setCurrentPage] = useState('');
  const { key, value } = filter;
  const alert = useAlert();

  useEffect(() => {
    async function connect() {
      if (key === 'ing') {
        const i = await filterIngredient(value, currentPage);
        return currentPage === 'Foods' ? setFoodApi(i) : setDrinkApi(i);
      }
      if (key === 'name') {
        const n = await filterName(value, currentPage);
        return currentPage === 'Foods' ? setFoodApi(n) : setDrinkApi(n);
      }
      if (key === 'first') {
        if (value.length > 1) {
          alert.error('Sua busca deve conter somente 1 (um) caracter', {
            onOpen: () => {
              console.log('subiu o alerta');
            },
            onClose: () => {
              console.log('fechou alerta');
            } });
          return;
        }
        const f = await filterFirstLetter(value, currentPage);
        console.log(value);
        return setFoodApi(f);
      }
    }
    connect();
  }, [key, value, currentPage, alert]);

  return (
    <FoodCtx.Provider
      value={ { foodApi, drinkApi, setFoodApi, filter, setFilter, setCurrentPage } }
    >
      {children}
    </FoodCtx.Provider>
  );
}

ContextFood.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ContextFood;
