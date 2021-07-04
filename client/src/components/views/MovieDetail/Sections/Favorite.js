import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
  const API_FAVORITE = '/api/favorite';
  const API_FAVORITE_NUMBER = `${API_FAVORITE}/favoriteNumber`;
  const API_FAVORITED = `${API_FAVORITE}/favorited`;
  const API_FAVORITE_REMOVE = `${API_FAVORITE}/removeFromFavorite`;
  const API_FAVORITE_ADD = `${API_FAVORITE}/addToFavorite`;
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
    const apiUrl = Favorited ? API_FAVORITE_REMOVE : API_FAVORITE_ADD;

    Axios.post(apiUrl, variables).then((response) => {
      if (response.data.success) {
        const setNumber = Favorited ? FavoriteNumber - 1 : FavoriteNumber + 1;
        setFavoriteNumber(setNumber);
        setFavorited(!Favorited);
      } else {
        alert(`Favorite ${Favorite ? '제거' : '추가'}에 실패했습니다.`);
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
