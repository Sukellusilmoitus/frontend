import React from 'react';
import {
  Col, Form, Button, Row, Breadcrumb,
} from 'react-bootstrap';
import useForm from '../hooks/useNewTargetForm';

function NewTargetForm(props) {
  const { postTarget } = props;
  const {
    handleChange, errors, handleSubmit,
  } = useForm(postTarget);

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
          <Form.Label>Kohteen nimi:</Form.Label>
          <Form.Control
            type="text"
            name="divername"
            data-testid="testdivername"
            onChange={handleChange}
            isInvalid={!!errors.divername}
            required
          />
          <Form.Control.Feedback type="invalid">
            { errors.divername }
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Breadcrumb>
          <Breadcrumb.Item>Syötä puhelinnumero ja/tai sähköposti</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
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
          </Col>
          <Col>
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
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Kuvaus kohteesta:</Form.Label>
              <Form.Control
                type="text"
                name="targetdescription"
                data-testid="testtargetdescription"
                onChange={handleChange}
                isInvalid={!!errors.targetdescription}
                required
              />
              <Form.Text className="text-muted">
                Hylky, hylyn osa, rakenne, esine, pintahylky, pohjaan vajonnut
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                { errors.targetdescription }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Vesialueen tai lähisaaren nimi:</Form.Label>
              <Form.Control
                type="text"
                name="locationname"
                data-testid="testlocationname"
                onChange={handleChange}
                isInvalid={!!errors.locationname}
                required
              />
              <Form.Control.Feedback type="invalid">
                { errors.locationname }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Pituuspiiri desimaaliasteina:</Form.Label>
              <Form.Control
                type="text"
                name="xcoordinate"
                data-testid="testxcoordinate"
                onChange={handleChange}
                isInvalid={!!errors.xcoordinate}
                required
              />
              <Form.Control.Feedback type="invalid">
                { errors.xcoordinate }
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                esim. 25.34234323
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Leveyspiiri desimaaliasteina:</Form.Label>
              <Form.Control
                type="text"
                name="ycoordinate"
                data-testid="testycoordinate"
                onChange={handleChange}
                isInvalid={!!errors.ycoordinate}
                required
              />
              <Form.Control.Feedback type="invalid">
                { errors.ycoordinate }
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                esim. 60.42342334
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Form.Group>
          <Form.Label>Koordinaattien määrittelytapa:</Form.Label>
          <Form.Control
            type="text"
            name="coordinateinfo"
            data-testid="testcoordinateinfo"
            onChange={handleChange}
            isInvalid={!!errors.coordinateinfo}
            required
          />
          <Form.Control.Feedback type="invalid">
            { errors.coordinateinfo }
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            GPS, arvio
          </Form.Text>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Paikannuksen tarkkuus:</Form.Label>
          <Form.Control
            type="text"
            name="diverinfo"
            data-testid="testdiverinfo"
            onChange={handleChange}
            isInvalid={!!errors.diverinfo}
            required
          />
          <Form.Control.Feedback type="invalid">
            { errors.diverinfo }
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Lisäinfoa:</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="misctext"
            data-testid="testmisctext"
            onChange={handleChange}
            isInvalid={!!errors.misctext}
            rows={3}
          />
          <Form.Control.Feedback type="invalid">
            { errors.misctext }
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Enintään 1000 merkkiä pitkä. Esimerkiksi voimakas virtaus, näkyvyys, verkot
          </Form.Text>
        </Form.Group>
        <br />
        <Button variant="primary" type="submit" value="Submit">Lähetä</Button>
      </Form>
      <br />
    </div>
  );
}
export default NewTargetForm;
