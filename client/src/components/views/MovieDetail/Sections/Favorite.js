import React, { useEffect } from 'react';
import Axios from 'axios';

function Favorite(props) {
  const API_FAVORITE_NUMBER = '/api/favoriteNumber';
  const { movieId, userFrom, movieInfo } = props; // movieInfo 를 여기서 미리할당 받아서 lint를 통과시킨다.
  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runTime;

  useEffect(() => {
    const variables = {
      userFrom,
      movieId,
    };
    // 1. mongodb에 요청
    Axios.post(API_FAVORITE_NUMBER, variables).then((response) => {
      if (response.data.success) {
        // todo
        return;
      }
      alert('숫자 정보를 가져오는데 실패 했습니다.');
    });
    // 2.
  }, []);
  return (
    <div>
      <button type="button">Favorite</button>
    </div>
  );
}

export default Favorite;
