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
  const movieRunTime = movieInfo.runTime;

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

    // todo 강사가 만든 버젼은 새로고침시 실제데이터를 가져오지않는다. 페이지 로딩시 실제 값을 가져와서 상태값을 박아주는 기능을 만들자.
    /*
      useEffect에서  axios.get('') 이렇게 백서버에 Request를 보내
      그 실제값을 다시 가져와서 넣어주시면 됩니다 ~!!^^  
    */
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
