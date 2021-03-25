import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useIsMeal } from '../../services/customHooks';
import { loadFromStorage, saveOnStorage } from '../../services/utils';

function prepareStorage() {
  const basicStructure = {
    cocktails: {},
    meals: {},
  };
  saveOnStorage('inProgressRecipes', basicStructure);
}

function saveInProgress(key, id) {
  const inProgressRecipes = loadFromStorage('inProgressRecipes');
  const newProgress = {
    ...inProgressRecipes,
    [key]: {
      ...inProgressRecipes[key],
      [id]: [],
    },
  };
  saveOnStorage('inProgressRecipes', newProgress);
}

function startRecipe(id, isMeal) {
  const inProgressRecipes = loadFromStorage('inProgressRecipes');
  if (inProgressRecipes === null) {
    prepareStorage();
  }
  if (isMeal) {
    saveInProgress('meals', id);
  } else {
    saveInProgress('cocktails', id);
  }
}

function continueRecipe(id, isMeal) {
  const inProgressRecipes = loadFromStorage('inProgressRecipes');
  let mealsCocktails = '';
  if (isMeal) {
    mealsCocktails = 'meals';
  } else {
    mealsCocktails = 'cocktails';
  }
  if (inProgressRecipes !== null && inProgressRecipes[mealsCocktails][id] !== undefined) {
    return true;
  }
  return false;
}

export default function DynamicButton() {
  const { id } = useParams();
  const isMeal = useIsMeal();

  if (continueRecipe(id, isMeal)) {
    return (
      <Link to={ `/comidas/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe"
          onClick={ () => startRecipe(id, isMeal) }
        >
          CONTINUAR RECEITA
        </button>
      </Link>
    );
  }
  return (
    <Link to={ `/comidas/${id}/in-progress` }>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe"
        onClick={ () => startRecipe(id, isMeal) }
      >
        INICIAR RECEITA
      </button>
    </Link>
  );
}
