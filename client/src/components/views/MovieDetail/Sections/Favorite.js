import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Favorite(props) {
  const API_FAVORITE = '/api/favorite';
  const API_FAVORITE_NUMBER = `${API_FAVORITE}/favoriteNumber`;
  const API_FAVORITED = `${API_FAVORITE}/favorited`;
  const { movieId, userFrom, movieInfo } = props; // movieInfo 를 여기서 미리할당 받아서 lint를 통과시킨다.
  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runTime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    const variables = {
      userFrom,
      movieId,
    };

    Axios.post(API_FAVORITE_NUMBER, variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
        return;
      }
      alert('숫자 정보를 가져오는데 실패 했습니다.');
    });

    Axios.post(API_FAVORITED, variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setFavorited(response.data.favorited);
        return;
      }
      alert('정보를 가져오는데 실패 했습니다.');
    });
  }, []);
  return (
    <div>
      <button type="button">
        {Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
