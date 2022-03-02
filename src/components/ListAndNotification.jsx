import React from 'react';
import { useHistory } from 'react-router-dom';
import TargetList from './TargetList';

function ListAndNotification({ targets, setTargets }) {
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/hylyt/${id}`);
  };

  return (
    <TargetList onRowClick={handleClick} targets={targets} setTargets={setTargets} />
  );
}

export default ListAndNotification;
