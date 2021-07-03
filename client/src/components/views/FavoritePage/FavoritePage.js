import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './favorite.css';
import { Button } from 'antd';

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  useEffect(() => {
    Axios.post('/api/favorite/getFavoritedMovie', {
      userFrom: localStorage.getItem('userId'),
    }).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
        return;
      }
      alert('영화정보를 가져오는데 실패 했습니다');
    });
  }, []);

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
        <tbody>
          {Favorites.map((favorite, index) => (
            <tr key={index}>
              <td>{favorite.movieTitle}</td>
              <td>{favorite.movieRunTime} mins</td>
              <td>
                <Button>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
