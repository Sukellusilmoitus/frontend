import React, { useState } from 'react';

function NotificationForm({ createNotification }) {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
  const [coordinateRadio, setCoordinateRadio] = useState('yes');
  const [newXCoordinate, setNewXCoordinate] = useState('');
  const [newYCoordinate, setNewYCoordinate] = useState('');
  const [newCoordinateText, setNewCoordinateText] = useState('');
  const [changeRadio, setChangeRadio] = useState('no');
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
      <h2>Tee uusi sukellusilmoitus</h2>

      <form onSubmit={addNotification}>
        Sukeltajan nimi:
        <input
          id="newname"
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
        <br />
        Puhelinnumero:
        <input
          id="newphone"
          value={newPhone}
          onChange={({ target }) => setNewPhone(target.value)}
        />
        <br />
        Hylyn nimi:
        <input
          id="newlocationname"
          value={newLocationName}
          onChange={({ target }) => setNewLocationName(target.value)}
        />
        <br />
        Olivatko koordinaatit oikein:
        Kyllä
        <input
          type="radio"
          checked={coordinateRadio === 'yes'}
          value="yes"
          onChange={(c) => { setCoordinateRadio(c.target.value); }}
        />
        Ei
        <input
          type="radio"
          checked={coordinateRadio === 'no'}
          value="no"
          onChange={(c) => { setCoordinateRadio(c.target.value); }}
        />
        {coordinateRadio === 'no' && (
        <p>
          {' '}
          Uusi pituuspiiri:
          <input
            id="newxcoordinate"
            value={newXCoordinate}
            onChange={({ target }) => setNewXCoordinate(target.value)}
          />
          <br />
          Uusi leveyspiiri:
          <input
            id="newycoordinate"
            value={newYCoordinate}
            onChange={({ target }) => setNewYCoordinate(target.value)}
          />
          <br />
          Koordinaatit lisäinfo:
          <input
            id="newcoordinatetext"
            value={newCoordinateText}
            onChange={({ target }) => setNewCoordinateText(target.value)}
          />
        </p>
        )}
        <br />
        Onko hylyssä havaittu muutoksia?:
        Kyllä
        <input
          type="radio"
          checked={changeRadio === 'yes'}
          value="yes"
          onChange={(c) => { setChangeRadio(c.target.value); }}
        />
        Ei
        <input
          type="radio"
          checked={changeRadio === 'no'}
          value="no"
          onChange={(c) => { setChangeRadio(c.target.value); }}
        />
        {changeRadio === 'yes' && (
        <p>
          {' '}
          Kuvaile muutoksia:
          <input
            id="newchange"
            value={newChangeText}
            onChange={({ target }) => setNewChangeText(target.value)}
          />
        </p>
        )}
        <br />
        Lisäinfoa:
        <input
          id="newmisctext"
          value={newMiscText}
          onChange={({ target }) => setNewMiscText(target.value)}
        />
        <br />
        <button type="submit">Lähetä</button>
      </form>
    </div>
  );
}
export default NotificationForm;
