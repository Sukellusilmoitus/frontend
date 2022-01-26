import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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

      <Form onSubmit={addNotification}>
        <Form.Group>
          <Form.Label>Sukeltajan nimi:</Form.Label>
          <Form.Control
            type="text"
            id="newname"
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
          />
          <br />
          <Form.Label>Puhelinnumero:</Form.Label>
          <Form.Control
            type="text"
            id="newphone"
            value={newPhone}
            onChange={({ target }) => setNewPhone(target.value)}
          />
          <br />
          <Form.Label>Hylyn nimi:</Form.Label>
          <Form.Control
            type="text"
            id="newlocationname"
            value={newLocationName}
            onChange={({ target }) => setNewLocationName(target.value)}
          />
          <br />
          <Form.Label>Olivatko koordinaatit oikein:</Form.Label>
          <Form.Check
            type="radio"
            label="Kyllä"
            checked={coordinateRadio === 'yes'}
            value="yes"
            onChange={(c) => { setCoordinateRadio(c.target.value); }}
          />
          <Form.Check
            type="radio"
            label="Ei"
            checked={coordinateRadio === 'no'}
            value="no"
            onChange={(c) => { setCoordinateRadio(c.target.value); }}
          />
          {coordinateRadio === 'no' && (
          <p>
            {' '}
            <Form.Label>Uusi pituuspiiri:</Form.Label>
            <Form.Control
              type="text"
              id="newxcoordinate"
              value={newXCoordinate}
              onChange={({ target }) => setNewXCoordinate(target.value)}
            />
            <br />
            <Form.Label>Uusi leveyspiiri:</Form.Label>
            <Form.Control
              type="text"
              id="newycoordinate"
              value={newYCoordinate}
              onChange={({ target }) => setNewYCoordinate(target.value)}
            />
            <br />
            <Form.Label>Koordinaatit lisäinfo:</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="newcoordinatetext"
              value={newCoordinateText}
              onChange={({ target }) => setNewCoordinateText(target.value)}
            />
          </p>
          )}
          <br />
          <Form.Label>Onko hylyssä havaittu muutoksia?:</Form.Label>
          <Form.Check
            type="radio"
            label="Kyllä"
            checked={changeRadio === 'yes'}
            value="yes"
            onChange={(c) => { setChangeRadio(c.target.value); }}
          />
          <Form.Check
            type="radio"
            label="Ei"
            checked={changeRadio === 'no'}
            value="no"
            onChange={(c) => { setChangeRadio(c.target.value); }}
          />
          {changeRadio === 'yes' && (
          <p>
            {' '}
            <Form.Label>Kuvaile muutoksia:</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="newchange"
              value={newChangeText}
              onChange={({ target }) => setNewChangeText(target.value)}
            />
          </p>
          )}
          <br />
          <Form.Label>Lisäinfoa:</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            id="newmisctext"
            value={newMiscText}
            onChange={({ target }) => setNewMiscText(target.value)}
          />
          <br />
          <Button variant="primary" type="submit">Lähetä</Button>
        </Form.Group>
      </Form>
    </div>
  );
}
export default NotificationForm;
