import React, { useState } from 'react';

function NotificationForm({ createNotification }) {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
  const [coordinateIsChecked, setCoordinateIsChecked] = useState(false);
  const [newXCoordinate, setNewXCoordinate] = useState('');
  const [newYCoordinate, setNewYCoordinate] = useState('');
  const [newCoordinateText, setNewCoordinateText] = useState('');
  const [changeIsChecked, setChangeIsChecked] = useState(false);
  const [newChangeText, setNewChangeText] = useState('');
  const [newMiscText, setNewMiscText] = useState('');

  const addNotification = (event) => {
    event.preventDefault();
    createNotification({
      name: newName,
      phone: newPhone,
      locationName: newLocationName,
      xCoordinate: newXCoordinate,
      yCoordinate: newYCoordinate,
      coordinateText: newCoordinateText,
      changeText: newChangeText,
      miscText: newMiscText,
    });

    setNewName('');
    setNewPhone('');
    setNewLocationName('');
    setNewXCoordinate('');
    setNewYCoordinate('');
    setNewCoordinateText('');
    setNewChangeText('');
    setNewMiscText('');
  };

  return (
    <div>
      <h2>Create a new notification</h2>

      <form onSubmit={addNotification}>
        Diver name:
        <input
          id="newname"
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
        <br />
        Phone:
        <input
          id="newphone"
          value={newPhone}
          onChange={({ target }) => setNewPhone(target.value)}
        />
        <br />
        Location Name:
        <input
          id="newlocationname"
          value={newLocationName}
          onChange={({ target }) => setNewLocationName(target.value)}
        />
        <br />
        Were coordinates correct:
        Yes
        <input
          type="checkbox"
        />
        No
        <input
          type="checkbox"
          checked={coordinateIsChecked}
          onChange={(c) => { setCoordinateIsChecked(c.target.checked); }}
        />
        {coordinateIsChecked && (
        <p>
          {' '}
          New longitude:
          <input
            id="newxcoordinate"
            value={newXCoordinate}
            onChange={({ target }) => setNewXCoordinate(target.value)}
          />
          <br />
          New latitude:
          <input
            id="newycoordinate"
            value={newYCoordinate}
            onChange={({ target }) => setNewYCoordinate(target.value)}
          />
          <br />
          Coordinate info:
          <input
            id="newcoordinatetext"
            value={newCoordinateText}
            onChange={({ target }) => setNewCoordinateText(target.value)}
          />
        </p>
        )}
        <br />
        Any changes on location?:
        Yes
        <input
          type="checkbox"
          checked={changeIsChecked}
          onChange={(e) => { setChangeIsChecked(e.target.checked); }}
        />
        No
        <input
          type="checkbox"
        />
        {changeIsChecked && (
        <p>
          {' '}
          What has changed:
          <input
            id="newchange"
            value={newChangeText}
            onChange={({ target }) => setNewChangeText(target.value)}
          />
        </p>
        )}
        <br />
        Extra info:
        <input
          id="newmisctext"
          value={newMiscText}
          onChange={({ target }) => setNewMiscText(target.value)}
        />
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  );
}
export default NotificationForm;
