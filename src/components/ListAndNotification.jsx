import React from 'react';
import { useHistory } from 'react-router-dom';
import TargetList from './TargetList';

function ListAndNotification({ targets }) {
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/hylyt/${id}`);
  };

  return (
    <TargetList onRowClick={handleClick} targets={targets} />
  );
}

export default ListAndNotification;
