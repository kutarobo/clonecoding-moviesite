import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './favorite.css';
import { Button, Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';
import Favorite from '../MovieDetail/Sections/Favorite';

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  const fetchFavoritedMovie = () => {
    Axios.post('/api/favorite/getFavoritedMovie', {
      userFrom: localStorage.getItem('userId'),
    }).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
        return;
      }
      alert('영화정보를 가져오는데 실패 했습니다');
    });
  };

  useEffect(() => {
    fetchFavoritedMovie();
  }, []);

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    Axios.post('/api/favorite/removeFromFavorite', variables).then(
      (response) => {
        if (!response.data.success) {
          alert('리스트에서 지우는데 실패했습니다.');
          return;
        }
        setFavorites((prevFavorites) =>
          prevFavorites.filter(
            (favorite) => favorite.movieId !== variables.movieId,
          ),
        );
      },
    );
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img
            src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}
            alt={favorite.movieTitle}
          />
        ) : (
          'no image'
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <Button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2> Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
