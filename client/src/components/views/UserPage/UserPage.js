import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function UserPage() {
  const [User, setUser] = useState([]);

  useEffect(() => {
    Axios.post('/api/users/userInfo', {
      userId: localStorage.getItem('userId'),
    }).then((response) => {
      if (response.data.success) {
        setUser(response.data.user);
        return;
      }
      alert('유저정보를 가져오는데 실패 했습니다');
    });
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {User && (
            <tr>
              <td>{User.name && User.name}</td>
              <td>{User.email && User.email}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
