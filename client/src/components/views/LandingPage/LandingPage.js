import React, { useEffect, useState } from 'react';
// import { FaCode } from 'react-icons/fa';
import { Row } from 'antd';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [page, setPage] = useState(1);

  const loadMoreItems = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies((prevMovies) => [...prevMovies, ...response.results]);
        setMainMovieImage(response.results[0]);
      });
  }, [page]);

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {/* main image */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movie by latest</h2>
        <hr />
        {/* movie grid cards */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="button" onClick={loadMoreItems}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
