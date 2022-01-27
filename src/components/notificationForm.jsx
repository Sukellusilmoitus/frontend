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

      <Form
        onSubmit={addNotification}
      >
        <Form.Group>
          <Form.Label>Sukeltajan nimi:</Form.Label>
          <Form.Control
            type="text"
            id="newname"
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
            pattern="(?!.*?\s{2})[A-Za-z ]{7,20}"
            onInvalid={(e) => { e.target.setCustomValidity('Tulee olla 7-20 merkkiä pitkä ja sisältää vain kirjaimia ja välilyöntejä'); }}
            onInput={(e) => { e.target.setCustomValidity(''); }}
            required
          />
          <Form.Text className="text-muted">
            Tulee olla 7-20 merkkiä pitkä
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Puhelinnumero:</Form.Label>
          <Form.Control
            type="text"
            id="newphone"
            value={newPhone}
            onChange={({ target }) => setNewPhone(target.value)}
            pattern="\+?[0-9]{3}-?[0-9]{6,12}"
            onInvalid={(e) => { e.target.setCustomValidity('Virheellinen puhelinnumero'); }}
            onInput={(e) => { e.target.setCustomValidity(''); }}
            required
          />
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Hylyn nimi:</Form.Label>
          <Form.Control
            type="text"
            id="newlocationname"
            value={newLocationName}
            onChange={({ target }) => setNewLocationName(target.value)}
            pattern="(?!.*?\s{2})[A-Za-z ]{4,20}"
            onInvalid={(e) => { e.target.setCustomValidity('Tulee olla 4-20 merkkiä pitkä ja sisältää vain kirjaimia ja välilyöntejä'); }}
            onInput={(e) => { e.target.setCustomValidity(''); }}
            required
          />
          <Form.Text className="text-muted">
            Tulee olla 4-20 merkkiä pitkä
          </Form.Text>
        </Form.Group>
        <Form.Group>
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
              pattern="[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)"
              onInvalid={(e) => { e.target.setCustomValidity('Virheellinen koordinaatti'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
            />
            <br />
            <Form.Label>Uusi leveyspiiri:</Form.Label>
            <Form.Control
              type="text"
              id="newycoordinate"
              value={newYCoordinate}
              onChange={({ target }) => setNewYCoordinate(target.value)}
              pattern="[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)"
              onInvalid={(e) => { e.target.setCustomValidity('Virheellinen koordinaatti'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
            />
            <br />
            <Form.Label>Koordinaatit lisäinfo:</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="newcoordinatetext"
              value={newCoordinateText}
              onChange={({ target }) => setNewCoordinateText(target.value)}
              pattern=".{10,1000}"
              onInvalid={(e) => { e.target.setCustomValidity('Tulee olla 10-1000 merkkiä pitkä'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
              required
            />
            <Form.Text className="text-muted">
              Tulee olla 10-1000 merkkiä pitkä
            </Form.Text>
          </p>
          )}
        </Form.Group>
        <Form.Group>
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
              pattern=".{10,1000}"
              onInvalid={(e) => { e.target.setCustomValidity('Tulee olla 10-1000 merkkiä pitkä'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
              required
            />
            <Form.Text className="text-muted">
              Tulee olla 10-1000 merkkiä pitkä
            </Form.Text>
          </p>
          )}
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Lisäinfoa:</Form.Label>
          <Form.Control
            as="textarea"
            id="newmisctext"
            value={newMiscText}
            onChange={({ target }) => setNewMiscText(target.value)}
            pattern=".{0,1000}"
            onInvalid={(e) => { e.target.setCustomValidity('Tulee olla enintään 1000 merkkiä pitkä'); }}
            onInput={(e) => { e.target.setCustomValidity(''); }}
          />
          <Form.Text className="text-muted">
            Enintään 1000 merkkiä pitkä
          </Form.Text>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">Lähetä</Button>
      </Form>
    </div>
  );
}
export default NotificationForm;
