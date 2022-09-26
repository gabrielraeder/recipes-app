import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

export default function Recommendations({ recommendations, title }) {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="carouselItem">
          <RecipeCard
            title={ title }
            recipe={ recommendations[0] }
            index={ 0 }
          />
          <RecipeCard
            title={ title }
            recipe={ recommendations[1] }
            index={ 1 }
          />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carouselItem">
          <RecipeCard
            title={ title }
            recipe={ recommendations[2] }
            index={ 2 }
          />
          <RecipeCard
            title={ title }
            recipe={ recommendations[3] }
            index={ 3 }
          />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carouselItem">
          <RecipeCard
            title={ title }
            recipe={ recommendations[4] }
            index={ 4 }
          />
          <RecipeCard
            title={ title }
            recipe={ recommendations[5] }
            index={ 5 }
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf().isRequired,
  title: PropTypes.string.isRequired,
};
