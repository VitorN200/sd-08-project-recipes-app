import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Context from '../../contextApi/Context';
import { getAllIngredients } from '../../services/FoodsDrinksRequests';
import List from '../../components/List/List';
import SearchBar from '../../components/SearchBar/SearchBar';

const ExplorerByIngridients = ({ title, visible }) => {
  const { ingredients, setIngredients, searchBar } = useContext(Context);

  useEffect(() => {
    getAllIngredients(title).then((response) => {
      setIngredients(response);
      // console.log(response)
    });
  }, [title]);

  return (
  <>
    <Header title={ title } visible={ visible } />
    {searchBar && <SearchBar title={ title } />}
    { ingredients && <List title={ title } results={ ingredients } refCard="ingredients" />}
    <Footer />
  </>
)};

ExplorerByIngridients.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ExplorerByIngridients;
