import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Context from '../context/Context';

const FOUR_SECONDS = 4000;

function FavoriteRecipeCard({ recipe, index }) {
  const history = useHistory();
  const [copied, setCopied] = useState('');
  const { setFavoriteRecipesList } = useContext(Context);

  async function removeFromFavorite() {
    const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavoriteRecipes = favoriteRecipes
      .filter((favorita) => favorita.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    setFavoriteRecipesList(updatedFavoriteRecipes);
  }

  return (
    <main>
      {
        recipe.type === 'meal'
          ? (
            <section>
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.area} - ${recipe.category}`}
              </p>
              <input
                className="card-image"
                type="image"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ `Recipe: ${recipe.name}` }
                onClick={ () => history.push(`/comidas/${recipe.id}`) }
              />
              <CopyToClipboard
                text={ `http://localhost:3000/comidas/${recipe.id}` }
                onCopy={ () => {
                  setCopied(index);
                  setTimeout(() => setCopied(''), FOUR_SECONDS);
                } }
              >
                <input
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="image"
                  src={ shareIcon }
                  alt="button share with friends"
                />
              </CopyToClipboard>
              {
                copied === index
                  ? <span style={ { color: 'red' } }>Link copiado!</span>
                  : null
              }
              <input
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="image"
                src={ blackHeartIcon }
                alt="unfavorite"
                onClick={ () => removeFromFavorite() }
              />
            </section>
          )
          : (
            <section>
              <p data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </p>
              <input
                type="image"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ `Recipe: ${recipe.name}` }
                onClick={ () => history.push(`/bebidas/${recipe.id}`) }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
              <CopyToClipboard
                text={ `http://localhost:3000/comidas/${recipe.id}` }
                onCopy={ () => {
                  setCopied(index);
                  setTimeout(() => setCopied(''), FOUR_SECONDS);
                } }
              >
                <input
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="image"
                  src={ shareIcon }
                  alt="button share with friends"
                />
              </CopyToClipboard>
              {
                copied === index
                  ? <span style={ { color: 'red' } }>Link copiado!</span>
                  : null
              }
              <input
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="image"
                src={ blackHeartIcon }
                alt="unfavorite"
                onClick={ () => removeFromFavorite() }
              />
              {console.log(recipe)}
            </section>
          )
      }
    </main>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteRecipeCard;
