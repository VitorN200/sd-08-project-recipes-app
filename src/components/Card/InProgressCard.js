import React, { useEffect, useState } from 'react';

import './InProgressCard.css';
import PropTypes from 'prop-types';

const InProgressCard = (props) => {
  const { url,
    id, category, title, img, ingredients, alcohol, instructions } = props;
  const [isDrinkOrFood, setIsDrinkOrFood] = useState('');

  const consoleFunction = () => {
    console.log(id);
  };

  const theButton = <button type="button" onClick={ consoleFunction }>BOTÃO</button>;

  useEffect(() => {
    if (url.includes('bebidas')) {
      setIsDrinkOrFood('Drink');
    } else { setIsDrinkOrFood('Food'); }
  }, [url]);

  const instructionsMapping = instructions.split(/,|\. | ;/g).map((string, index) => {
    if (instructions.split(/,|\. | ;/g).length !== index + 1) {
      return (
        <li key={ `instruction-${index}` }>
          {`${string.trim().charAt(0).toUpperCase()}${string.trim().slice(1)}`}
          {' '}
          ;
        </li>);
    }
    return (
      <li key={ `instruction-${index}` }>
        {`${string.trim().charAt(0).toUpperCase()}${string.trim().slice(1)}`}
        {' '}
      </li>);
  });

  const ingredientsMapping = ingredients.map((ingredient, index) => {
    if (ingredient !== '  ') {
      return (
        <div key={ `${index}-${ingredient}` } data-testid="ingredient-step">
          <input
            id={ `id-${index}` }
            type="checkbox"
            value={ ingredient }
            // onChange={ ({ target }) => { console.log(target.checked); } }
          />
          <label htmlFor={ `id-${index}` }>
            {ingredient}
          </label>
        </div>
      );
    }
    return (
      <li data-testid={ `${index}-ingredient-step` } key={ `${index}-${ingredient}` }>
        <input
          id={ `${index}-ingredient-step` }
          type="checkbox"
          value={ ingredient }
        />
        <label htmlFor={ `${index}-ingredient-step` }>
          {ingredient}
        </label>
      </li>
    );
    // return '';
  });

  const renderFood = () => (
    <div
      name={ id }
      className="card-container"
      data-testid="recipe-card"
      role="button"
    >
      <h4 data-testid="recipe-title">{title}</h4>
      <span data-testid="recipe-category">{`Category => ${category}`}</span>
      <img src={ img } alt={ title } data-testid="recipe-photo" />
      <ul className="unordered-list">
        {ingredientsMapping}
      </ul>
      <ol
        style={ { display: 'flex',
          flexFlow: 'column wrap',
          textAlign: 'center',
          listStylePosition: 'inside' } }
        data-testid="instructions"
      >
        {instructionsMapping}
        Voilá!
      </ol>

    </div>);

  const renderDrink = () => (
    <div
      name={ id }
      className="card-container"
      data-testid="recipe-card"
      role="button"
    >
      <h4 data-testid="recipe-title">{title}</h4>
      <span data-testid="recipe-category">{`Category => ${category}`}</span>
      <span>{alcohol}</span>
      <img src={ img } alt={ title } data-testid="recipe-photo" />
      <ul>
        {ingredientsMapping}
      </ul>
      <ol
        style={
          { display: 'flex',
            flexFlow: 'column wrap',
            textAlign: 'center',
            listStylePosition: 'inside' }
        }
        data-testid="instructions"
      >
        {instructionsMapping}
        Voilá!
      </ol>
    </div>);

  return (
    <main>
      {theButton}
      {isDrinkOrFood === 'Drink' ? renderDrink() : renderFood()}

    </main>
  );
};

InProgressCard.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  alcohol: PropTypes.string,
  instructions: PropTypes.string.isRequired,
};

InProgressCard.defaultProps = {
  alcohol: PropTypes.string,
};

export default InProgressCard;
