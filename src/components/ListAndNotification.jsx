import React, { useState, useRef } from 'react';
import NotificationForm from './NotificationForm';
import TargetsList from './TargetsList';
import diveService from '../services/dives';

function ListAndNotification() {
  const [targetName, setTargetName] = useState('');
  const [targetId, setTargetId] = useState('');
  const [targetXcoordinate, setTargetXcoordinate] = useState('');
  const [targetYcoordinate, setTargetYcoordinate] = useState('');
  const formRef = useRef(null);

  const scrollToBottom = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = (name, id, coordinates) => {
    setTargetName(name);
    setTargetId(id);
    setTargetXcoordinate(coordinates[0]);
    setTargetYcoordinate(coordinates[1]);
    scrollToBottom();
  };

  const createNewNotification = (notification) => {
    diveService.create(notification);
  };

  return (
    <div>
      <TargetsList onRowClick={handleClick} />
      <div
        style={{
          float: 'left',
          clear: 'both',
        }}
        ref={formRef}
      />
      <NotificationForm
        targetName={targetName}
        targetId={targetId}
        targetXcoordinate={targetXcoordinate}
        targetYcoordinate={targetYcoordinate}
        createNotification={createNewNotification}
      />
    </div>
  );
}

export default ListAndNotification;
