import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getMealDetails } from '../../services/theMeadlDB';
import Loading from '../../components/Loading';
import DetailsHeader from '../../components/DetailsHeader';
import InstructionsSection from '../../components/InstructionsSection';
import Recomendations from '../../components/Recomendations';
import { FetchDrinksOnMount } from '../../services/theCockTailDB';
import RecipeButton from '../../components/RecipeButton';

function FoodDetails() {
  const { id } = useParams();
  const [mealData, setMealData] = useState([{}]);
  const [isFetching, setIsFetching] = useState(true);
  const [recomendations, setRecomendations] = useState([{}]);

  useEffect(() => {
    const fetchDetails = async () => {
      const recipe = await getMealDetails(id);
      const currentRecomendations = await FetchDrinksOnMount();
      setRecomendations(currentRecomendations);
      setMealData(recipe);
      setIsFetching(false);
    };
    fetchDetails();
  }, [id]);

  const { strMeal, strCategory, strMealThumb, strYoutube } = mealData[0];
  if (isFetching) return <Loading />;
  return (
    <Container className="m-0 p-0 d-flex justify-content-center flex-column" fluid>
      <Container className="m-0 p-0">
        <DetailsHeader
          title={ strMeal }
          imgSrc={ strMealThumb }
          category={ strCategory }
        />
      </Container>
      <Container>
        <InstructionsSection fullRecipe={ mealData } />
      </Container>
      <h5 className="text-center"> Video </h5>
      <Container className="embed-responsive embed-responsive-4by3">
        <iframe
          className="embed-responsive-item"
          src={ `https://www.youtube.com/embed/${strYoutube.split('v=')[1]}` }
          data-testid="video"
          title="Video"
        />
      </Container>
      <Recomendations recomendations={ recomendations } />
      <RecipeButton />
    </Container>
  );
}

export default FoodDetails;
