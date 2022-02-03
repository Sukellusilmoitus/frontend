import React, { useState, useRef } from 'react';
import NotificationForm from './NotificationForm';
import WrecksList from './WrecksList';
import diveService from '../services/dives';

function ListAndNotification() {
  const [wreckName, setWreckName] = useState('');
  const [wreckId, setWreckId] = useState('');
  const formRef = useRef(null);

  const scrollToBottom = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = (name, id) => {
    setWreckName(name);
    setWreckId(id);
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
        createNotification={createNewNotification}
      />
    </div>
  );
}

export default ListAndNotification;
