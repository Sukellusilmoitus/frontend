import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Submitmessage({ message }) {

  if (message === null) {
    return null;
  }

  if (message === 'Lomake lähetetty!') {
      return (
    <div>
      <Alert variant="success">{message}</Alert>
    </div>
  );
  }

  return (
    <div>
      <Alert variant="danger">{message}</Alert>
    </div>
  );
}

export default Submitmessage;
