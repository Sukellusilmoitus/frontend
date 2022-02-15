import React from 'react';
import { useHistory } from 'react-router-dom';
import TargetsList from './TargetsList';

function ListAndNotification() {
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/hylyt/${id}`);
  };

  return (
    <TargetsList onRowClick={handleClick} />
  );
}

export default ListAndNotification;
