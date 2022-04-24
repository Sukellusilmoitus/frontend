import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function Logout() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      localStorage.removeItem('auth');
    }
    history.push('/');
  }, []);

  return (
    <LoadingSpinner />
  );
}

export default Logout;
