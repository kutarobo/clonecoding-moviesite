import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
  const API_FAVORITE = '/api/favorite';
  const API_FAVORITE_NUMBER = `${API_FAVORITE}/favoriteNumber`;
  const API_FAVORITED = `${API_FAVORITE}/favorited`;
  const { movieId, userFrom, movieInfo } = props; // movieInfo 를 여기서 미리할당 받아서 lint를 통과시킨다.
  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    Axios.post(API_FAVORITE_NUMBER, variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
        return;
      }
      alert('숫자 정보를 가져오는데 실패 했습니다.');
    });

    Axios.post(API_FAVORITED, variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
        return;
      }
      alert('정보를 가져오는데 실패 했습니다.');
    });
  }, []);

  const toggleFavorite = () => {
    if (Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
          }
        },
      );
      return;
    }
    Axios.post('/api/favorite/AddToFavorite', variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(FavoriteNumber + 1);
        setFavorited(!Favorited);
      } else {
        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
      }
    });
  };
  return (
    <div>
      <Button type="button" onClick={toggleFavorite}>
        {Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
