import React, { useState, useRef } from 'react';
import NotificationForm from './NotificationForm';
import WrecksList from './WrecksList';
import diveService from '../services/dives';

function ListAndNotification() {
  const [wreckName, setWreckName] = useState('');
  const [wreckId, setWreckId] = useState('');
  const [wreckXcoordinate, setWreckXcoordinate] = useState('');
  const [wreckYcoordinate, setWreckYcoordinate] = useState('');
  const formRef = useRef(null);

  const scrollToBottom = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = (name, id, coordinates) => {
    setWreckName(name);
    setWreckId(id);
    setWreckXcoordinate(coordinates[0]);
    setWreckYcoordinate(coordinates[1]);
    scrollToBottom();
  };

  const createNewNotification = (notification) => {
    diveService.create(notification);
  };

  return (
    <div>
      <WrecksList onRowClick={handleClick} />
      <div
        style={{
          float: 'left',
          clear: 'both',
        }}
        ref={formRef}
      />
      <NotificationForm
        wreckName={wreckName}
        wreckId={wreckId}
        wreckXcoordinate={wreckXcoordinate}
        wreckYcoordinate={wreckYcoordinate}
        createNotification={createNewNotification}
      />
    </div>
  );
}

export default ListAndNotification;
