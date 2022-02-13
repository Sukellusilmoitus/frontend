import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useForm from '../hooks/useNewTargetForm';

function NewTargetForm(props) {
  const { createNotification } = props;
  const [coordinateRadio, setCoordinateRadio] = useState('no');

  const {
    handleChange, errors, handleSubmit,
  } = useForm(createNotification);

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
        onSubmit={handleSubmit}
        data-testid="testform"
      >
        <Form.Group>
          <Form.Label>Etu- ja sukunimi:</Form.Label>
          <Form.Control
            type="text"
            name="divername"
            data-testid="testdivername"
            onChange={handleChange}
            isInvalid={!!errors.divername}
          />
          <Form.Control.Feedback type="invalid">
            { errors.divername }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Puhelinnumero:</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            data-testid="testphone"
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            { errors.phone }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sähköpostiosoite:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            data-testid="testemail"
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            { errors.email }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Kuvaus kohteesta:</Form.Label>
          <Form.Control
            type="text"
            name="targetdescription"
            data-testid="testtargetdescription"
            onChange={handleChange}
            isInvalid={!!errors.targetdescription}
          />
          <Form.Text className="text-muted">
            Hylky, hylyn osa, rakenne, esine, pintahylky, pohjaan vajonnut
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            { errors.targetdescription }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Vesialueen tai lähisaaren nimi:</Form.Label>
          <Form.Control
            type="text"
            name="locationname"
            data-testid="testlocationname"
            onChange={handleChange}
            isInvalid={!!errors.locationname}
          />
          <Form.Control.Feedback type="invalid">
            { errors.locationname }
          </Form.Control.Feedback>
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
              name="xcoordinate"
              data-testid="testxcoordinate"
              onChange={handleChange}
              isInvalid={!!errors.xcoordinate}
            />
            <Form.Control.Feedback type="invalid">
              { errors.xcoordinate }
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              esim. 25.34234323
            </Form.Text>
            <br />
            <Form.Label>Leveyspiiri desimaaliasteina:</Form.Label>
            <Form.Control
              type="text"
              name="ycoordinate"
              data-testid="testycoordinate"
              onChange={handleChange}
              isInvalid={!!errors.ycoordinate}
            />
            <Form.Control.Feedback type="invalid">
              { errors.ycoordinate }
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              esim. 60.42342334
            </Form.Text>
          </p>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Paikannuksen lisäinfo:</Form.Label>
          <Form.Control
            type="text"
            name="coordinateinfo"
            data-testid="testcoordinateinfo"
            onChange={handleChange}
            isInvalid={!!errors.coordinateinfo}
          />
          <Form.Control.Feedback type="invalid">
            { errors.coordinateinfo }
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            GPS, arvio
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tarkastussukeltajalle tärkeät havainnot:</Form.Label>
          <Form.Control
            type="text"
            name="diverinfo"
            data-testid="testdiverinfo"
            onChange={handleChange}
            isInvalid={!!errors.diverinfo}
          />
          <Form.Control.Feedback type="invalid">
            { errors.diverinfo }
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Esimerkiksi voimakas virtaus, näkyvyys, verkot
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Lisäinfoa:</Form.Label>
          <Form.Control
            type="text"
            name="misctext"
            data-testid="testmisctest"
            onChange={handleChange}
            isInvalid={!!errors.misctext}
          />
          <Form.Control.Feedback type="invalid">
            { errors.misctext }
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Enintään 1000 merkkiä pitkä
          </Form.Text>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" value="Submit">Lähetä</Button>
      </Form>
    </div>
  );
}
export default NewTargetForm;
