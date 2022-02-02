import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function NotificationForm(props, { createNotification }) {
  const { wreckName, wreckId } = props;
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationId, setNewLocationId] = useState('');
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
      locationId: newLocationId,
      xCoordinate: newXCoordinate,
      yCoordinate: newYCoordinate,
      coordinateText: newCoordinateText,
      changeText: newChangeText,
      miscText: newMiscText,
    });

    setNewName('');
    setNewPhone('');
    setNewLocationName('');
    setNewLocationId('');
    setNewXCoordinate('');
    setNewYCoordinate('');
    setNewCoordinateText('');
    setNewChangeText('');
    setNewMiscText('');
  };

  const update = () => {
    setNewLocationName(wreckName);
    setNewLocationId(wreckId);
  };

  return (
    <div>
      <h2>Tee uusi sukellusilmoitus</h2>

      <Form
        onSubmit={() => addNotification()}
        onFocus={() => update()}
        data-testid="testform"
      >
        <Form.Group>
          <Form.Label>Sukeltajan etu- ja sukunimi:</Form.Label>
          <Form.Control
            type="text"
            id="newname"
            data-testid="testname"
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
            pattern="(?!.*?\s{2})[ A-Za-zäöåÅÄÖ]{7,20}"
            onInvalid={(e) => { e.target.setCustomValidity('Tulee olla 7-20 merkkiä pitkä ja sisältää vain kirjaimia ja välilyöntejä'); }}
            onInput={(e) => { e.target.setCustomValidity(''); }}
            required
          />
          <Form.Text className="text-muted">
            Pakollinen kenttä
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Puhelinnumero:</Form.Label>
          <Form.Control
            type="text"
            id="newphone"
            data-testid="testphone"
            value={newPhone}
            onChange={({ target }) => setNewPhone(target.value)}
            pattern="\+?[0-9]{3}-?[0-9]{6,12}"
            onInvalid={(e) => { e.target.setCustomValidity('Virheellinen puhelinnumero'); }}
            onInput={(e) => { e.target.setCustomValidity(''); }}
            required
          />
          <Form.Text className="text-muted">
            Pakollinen kenttä
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Hylyn nimi:</Form.Label>
          <Form.Control
            type="text"
            id="newlocationname"
            value={wreckName}
            onChange={({ target }) => setNewLocationName(target.value)}
            readOnly
            required
          />
          <Form.Text className="text-muted">
            Automaattinen täyttö (klikkaa kohdetta)
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Hylyn id:</Form.Label>
          <Form.Control
            type="text"
            id="newlocationid"
            value={wreckId}
            onChange={({ target }) => setNewLocationId(target.value)}
            readOnly
            required
          />
          <Form.Text className="text-muted">
            Automaattinen täyttö (klikkaa kohdetta)
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
            <Form.Label>Uusi pituuspiiri desimaaliasteina:</Form.Label>
            <Form.Control
              type="text"
              id="newxcoordinate"
              value={newXCoordinate}
              onChange={({ target }) => setNewXCoordinate(target.value)}
              pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)"
              onInvalid={(e) => { e.target.setCustomValidity('Anna koordinaatti muodossa xx.xxxxxxxx, esim. 25.34234323'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
              required
            />
            <Form.Text className="text-muted">
              Pakollinen kenttä
            </Form.Text>
            <br />
            <Form.Label>Uusi leveyspiiri desimaaliasteina:</Form.Label>
            <Form.Control
              type="text"
              id="newycoordinate"
              value={newYCoordinate}
              onChange={({ target }) => setNewYCoordinate(target.value)}
              pattern="^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)"
              onInvalid={(e) => { e.target.setCustomValidity('Anna koordinaatti muodossa xx.xxxxxxxx, esim. 60.42342334'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
              required
            />
            <Form.Text className="text-muted">
              Pakollinen kenttä
            </Form.Text>
            <br />
            <Form.Label>Paikannuksen lisäinfo:</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="newcoordinatetext"
              value={newCoordinateText}
              onChange={({ target }) => setNewCoordinateText(target.value)}
              pattern=".{10,1000}"
              onInvalid={(e) => { e.target.setCustomValidity('Tulee olla 10-1000 merkkiä pitkä'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
            />
            <Form.Text className="text-muted">
              Pakollinen kenttä
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
              Pakollinen kenttä
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
