import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
  const { match } = props;
  const { movieId } = match.params;

  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    console.log(props.match);
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);
      });
  }, []);
  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        {/* Movie Info */}
        <MovieInfo movie={Movie} />

        <br />
        {/* Actors Grid */}
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
        >
          <button type="button">Toggle Actor View</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
