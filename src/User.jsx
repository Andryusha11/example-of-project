import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const baseUrl = 'https://api.github.com/users';

const User = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const fetchUserData = userName =>
    fetch(`${baseUrl}/${userName}`).then(res => {
      if (!res.ok) {
        throw new Error('Oops');
      }
      return res.json();
    });

  useEffect(() => {
    fetchUserData(userId).then(userData => setUserData(userData));
    return setUserData(null);
  }, [userId]);

  return (
    userData && (
      <div className="user">
        <img
          alt="User Avatar"
          src={userData.avatar_url}
          className="user__avatar"
        />
        <div className="user__info">
          <span className="user__name">{userData.name}</span>
          <span className="user__location">{userData.location}</span>
        </div>
      </div>
    )
  );
};

export default User;
