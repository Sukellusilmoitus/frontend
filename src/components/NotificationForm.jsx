import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import formatcoords from 'formatcoords';
import useForm from '../hooks/useNewNotificationForm';
import Submitmessage from './Submitmessage';
import CoordinatesMap from './CoordinatesMap';

function NewNotificationForm(props) {
  const {
    targetName,
    targetId,
    targetXcoordinate,
    targetYcoordinate,
    coordinatesDMS,
  } = props;

  const [coordinateRadio, setCoordinateRadio] = useState('yes');
  const [changeRadio, setChangeRadio] = useState('no');
  const [defaultCenter, setDefaultCenter] = useState([64.1, 25.0]);
  const [formX, setFormX] = useState(targetXcoordinate);
  const [formY, setFormY] = useState(targetYcoordinate);

  useEffect(() => {
    setDefaultCenter([64.1, 25.0]);
  }, defaultCenter);

  const [DMS, setDMS] = useState(formatcoords(
    Number(formX),
    Number(formY),
  ).format());

  useEffect(() => {
    setDMS(formatcoords(
      Number(formX),
      Number(formY),
    ).format());
  }, [formX, formY]);

  const {
    handleChange, errors, message, handleSubmit, resetChangeText,
    handleCoordinateChange, center, handleCoordinateClick,
  } = useForm(props);

  const handleChangeRadio = (value) => {
    setChangeRadio(value);

    if (value === 'no') {
      resetChangeText();
    }
  };

  const handleXCoordinateChange = (event, coordinate, name) => {
    if (event === null) {
      handleCoordinateClick(coordinate, name);
      setFormX(coordinate);
    } else {
      handleChange(event);
      setFormX(event.target.value);
    }
  };

  const handleYCoordinateChange = (event, coordinate, name) => {
    if (event === null) {
      handleCoordinateClick(coordinate, name);
      setFormY(coordinate);
    } else {
      handleChange(event);
      setFormY(event.target.value);
    }
  };

  const handleCoordinateChangeClick = (value) => {
    if (value === 'yes') {
      handleYCoordinateChange(null, targetYcoordinate, 'ycoordinate');
      handleXCoordinateChange(null, targetXcoordinate, 'xcoordinate');
    }
    handleCoordinateChange(value);
    setCoordinateRadio(value);
  };

  return (
    <div>
      <h2>Tee uusi sukellusilmoitus</h2>
      <Submitmessage message={message} />
      <Form
        onSubmit={handleSubmit(changeRadio)}
        data-testid="testform"
        id="newtargetform"
      >
        <Form.Group>
          <Form.Label>Sukeltajan etu- ja sukunimi:</Form.Label>
          <Form.Control
            type="text"
            name="divername"
            data-testid="testdivername"
            id="newname"
            onChange={handleChange}
            isInvalid={!!errors.divername}
          />
          <Form.Text className="text-muted">
            Pakollinen kenttä
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            { errors.divername }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Puhelinnumero:</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            data-testid="testphone"
            id="newphone"
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Text className="text-muted">
            Anna joko puhelinnumero tai sähköposti
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            { errors.phone }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Sähköpostiosoite:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            data-testid="testemail"
            id="newemail"
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Text className="text-muted">
            Anna joko puhelinnumero tai sähköposti
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            { errors.email }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Hylyn nimi:</Form.Label>
          <Form.Control
            type="text"
            id="newlocationname"
            value={targetName}
            readOnly
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
            value={targetId}
            readOnly
          />
          <Form.Text className="text-muted">
            Automaattinen täyttö (klikkaa kohdetta)
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>
            Nykyiset koordinaatit
            <br />
            Lat:
            {' '}
            {targetYcoordinate}
            {', '}
            Lon:
            {' '}
            {targetXcoordinate}
            <br />
            {coordinatesDMS}
          </Form.Label>
          <br />
          <Form.Label>Olivatko koordinaatit oikein:</Form.Label>
          <Form.Check
            type="radio"
            label="Kyllä"
            checked={coordinateRadio === 'yes'}
            data-testid="testradio1"
            value="yes"
            onChange={(c) => {
              handleCoordinateChangeClick(c.target.value);
            }}
          />
          <Form.Check
            type="radio"
            label="Ei"
            checked={coordinateRadio === 'no'}
            data-testid="testradio2"
            value="no"
            onChange={(c) => { handleCoordinateChangeClick(c.target.value); }}
          />
          {coordinateRadio === 'no' && (
          <p>
            {' '}
            <Form.Label>Uusi pituuspiiri desimaaliasteina:</Form.Label>
            <Form.Control
              type="text"
              id="newxcoordinate"
              data-testid="testxcoordinate"
              name="xcoordinate"
              value={formX}
              onChange={handleXCoordinateChange}
              isInvalid={!!errors.xcoordinate}
            />
            <Form.Text className="text-muted">
              Pakollinen kenttä
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              { errors.xcoordinate }
            </Form.Control.Feedback>
            <br />
            <Form.Label>Uusi leveyspiiri desimaaliasteina:</Form.Label>
            <Form.Control
              type="text"
              id="newycoordinate"
              data-testid="testycoordinate"
              name="ycoordinate"
              value={formY}
              onChange={handleYCoordinateChange}
              isInvalid={!!errors.ycoordinate}
            />
            <Form.Text className="text-muted">
              Pakollinen kenttä
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              { errors.ycoordinate }
            </Form.Control.Feedback>
            <br />
            {DMS}
            {(center[0] === undefined || center[1] === undefined) && (
              <CoordinatesMap
                center={defaultCenter}
                handleXCoordinateChange={handleXCoordinateChange}
                handleYCoordinateChange={handleYCoordinateChange}
              />
            )}
            {(center[0] !== undefined && center[1] !== undefined) && (
              <CoordinatesMap
                center={center}
                handleXCoordinateChange={handleXCoordinateChange}
                handleYCoordinateChange={handleYCoordinateChange}
              />
            )}
            <br />
            <Form.Label>
              Mikä vanhoissa koordinaateissa oli pielessä ja miten uudet koordinaatit on mitattu:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="newcoordinatetext"
              data-testid="testcoordinateinfo"
              name="coordinateinfo"
              onChange={handleChange}
              isInvalid={!!errors.coordinateinfo}
            />
            <Form.Control.Feedback type="invalid">
              { errors.coordinateinfo }
            </Form.Control.Feedback>
          </p>
          )}
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Onko hylyssä havaittu muutoksia?:</Form.Label>
          <Form.Check
            type="radio"
            label="Kyllä"
            data-testid="testradio3"
            checked={changeRadio === 'yes'}
            value="yes"
            onChange={(c) => { handleChangeRadio(c.target.value); }}
          />
          <Form.Check
            type="radio"
            label="Ei"
            data-testid="testradio4"
            checked={changeRadio === 'no'}
            value="no"
            onChange={(c) => { handleChangeRadio(c.target.value); }}
          />
          {changeRadio === 'yes' && (
          <p>
            {' '}
            <Form.Label>Kuvaile muutoksia:</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="newchange"
              name="changeText"
              data-testid="testchange"
              onChange={handleChange}
              isInvalid={!!errors.changeText}
            />
            <Form.Text className="text-muted">
              Pakollinen kenttä
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              { errors.changeText }
            </Form.Control.Feedback>
          </p>
          )}
        </Form.Group>
        <Form.Group>
          <br />
          <Form.Label>Lisäinfoa:</Form.Label>
          <Form.Control
            as="textarea"
            id="newmisctext"
            data-testid="testmisc"
            name="misctext"
            onChange={handleChange}
            isInvalid={!!errors.misctext}
          />
          <Form.Text className="text-muted">
            Enintään 1000 merkkiä pitkä
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            { errors.misctext }
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button id="formbtn" variant="primary" type="submit">Lähetä</Button>
      </Form>
    </div>
  );
}
export default NewNotificationForm;
