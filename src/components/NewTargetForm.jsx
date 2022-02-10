import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function NewTargetForm(props) {
  const { createNotification } = props;

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTargetDescription, setNewTargetDescription] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
  const [coordinateRadio, setCoordinateRadio] = useState('no');
  const [newXCoordinate, setNewXCoordinate] = useState('');
  const [newYCoordinate, setNewYCoordinate] = useState('');
  const [newCoordinateText, setNewCoordinateText] = useState('');
  const [newDiverInfoText, setNewDiverInfoText] = useState('');
  const [newMiscText, setNewMiscText] = useState('');

  const addNotification = (event) => {
    event.preventDefault();
    createNotification({
      name: newName,
      phone: newPhone,
      email: newEmail,
      targetDescription: newTargetDescription,
      locationName: newLocationName,
      locationCorrect: coordinateRadio === 'yes',
      xCoordinate: newXCoordinate,
      yCoordinate: newYCoordinate,
      coordinateText: newCoordinateText,
      diverInfoText: newDiverInfoText,
      miscText: newMiscText,
    });

    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewTargetDescription('');
    setNewLocationName('');
    setNewXCoordinate('');
    setNewYCoordinate('');
    setNewCoordinateText('');
    setNewDiverInfoText('');
    setNewMiscText('');
  };

  return (
    <div>
      <h2>Tee ilmoitus uudesta kohteesta</h2>
      <h3>
        Suositteleme yksityiskohtaisemman ilmoituksen tekemistä museoviraston
        {' '}
        <a href="https://www.kyppi.fi/ilppari">sivuilla</a>
        {' '}
      </h3>
      <h5>Kaikki paitsi lisäinfoa-kenttä ovat pakollisia</h5>
      <Form
        onSubmit={(event) => addNotification(event)}
        data-testid="testform"
        validated
      >
        <Form.Group>
          <Form.Label>Etu- ja sukunimi:</Form.Label>
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
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Puhelinnumero:</Form.Label>
          <Form.Control
            type="tel"
            id="newphone"
            data-testid="testphone"
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
          <Form.Label>Sähköpostiosoite:</Form.Label>
          <Form.Control
            type="email"
            id="newemail"
            data-testid="testemail"
            value={newEmail}
            onChange={({ target }) => setNewEmail(target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Kuvaus kohteesta:</Form.Label>
          <Form.Control
            type="text"
            id="newtargetdescription"
            data-testid="testtargetdescription"
            value={newTargetDescription}
            onChange={({ target }) => setNewTargetDescription(target.value)}
            required
          />
          <Form.Text className="text-muted">
            Hylky, hylyn osa, rakenne, esine, pintahylky, pohjaan vajonnut
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Vesialueen tai lähisaaren nimi:</Form.Label>
          <Form.Control
            type="text"
            id="newlocationname"
            value={newLocationName}
            onChange={({ target }) => setNewLocationName(target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Ovatko koordinaatit tiedossa:</Form.Label>
          <Form.Check
            type="radio"
            label="Kyllä"
            data-testid="testradio"
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
          {coordinateRadio === 'yes' && (
          <p>
            {' '}
            <Form.Label>Pituuspiiri desimaaliasteina:</Form.Label>
            <Form.Control
              type="text"
              id="newxcoordinate"
              data-testid="testxcoordinate"
              value={newXCoordinate}
              onChange={({ target }) => setNewXCoordinate(target.value)}
              pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)"
              onInvalid={(e) => { e.target.setCustomValidity('Anna koordinaatti muodossa xx.xxxxxxxx, esim. 25.34234323'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
              required
            />
            <Form.Text className="text-muted">
              esim. 25.34234323
            </Form.Text>
            <br />
            <Form.Label>Leveyspiiri desimaaliasteina:</Form.Label>
            <Form.Control
              type="text"
              id="newycoordinate"
              data-testid="testycoordinate"
              value={newYCoordinate}
              onChange={({ target }) => setNewYCoordinate(target.value)}
              pattern="^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)"
              onInvalid={(e) => { e.target.setCustomValidity('Anna koordinaatti muodossa xx.xxxxxxxx, esim. 60.42342334'); }}
              onInput={(e) => { e.target.setCustomValidity(''); }}
              required
            />
            <Form.Text className="text-muted">
              esim. 60.42342334
            </Form.Text>
          </p>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Paikannuksen lisäinfo:</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            id="newcoordinatetext"
            data-testid="testcoordinateinfo"
            value={newCoordinateText}
            onChange={({ target }) => setNewCoordinateText(target.value)}
            pattern=".{3,1000}"
            onInvalid={(e) => { e.target.setCustomValidity('Tulee olla 3-1000 merkkiä pitkä'); }}
            onInput={(e) => { e.target.setCustomValidity(''); }}
            required
          />
          <Form.Text className="text-muted">
            GPS, arvio
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tarkastussukeltajalle tärkeät havainnot:</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            id="newdiverinfo"
            data-testid="testdiverinfo"
            value={newDiverInfoText}
            onChange={({ target }) => setNewDiverInfoText(target.value)}
            pattern=".{10,1000}"
            onInvalid={(e) => { e.target.setCustomValidity('Tulee olla 10-1000 merkkiä pitkä'); }}
            onInput={(e) => { e.target.setCustomValidity(''); }}
            required
          />
          <Form.Text className="text-muted">
            Esimerkiksi voimakas virtaus, näkyvyys, verkot
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Lisäinfoa:</Form.Label>
          <Form.Control
            as="textarea"
            id="newmisctext"
            data-testid="testmisc"
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
export default NewTargetForm;
