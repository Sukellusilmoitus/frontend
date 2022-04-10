import React, { useState, useEffect } from 'react';
import {
  Col, Form, Button, Row, Breadcrumb, Container,
} from 'react-bootstrap';
import { Parser } from 'html-to-react';
import formatcoords from 'formatcoords';
import useForm from '../hooks/useNewTargetForm';
import Submitmessage from './Submitmessage';
import CoordinatesMap from './CoordinatesMap';
import Modal from './Modal';
import privacyText from '../assets/tietosuoja';
import PageTitle from './PageTitle';

function NewTargetForm(props) {
  const { postTarget } = props;
  const [defaultCenter, setDefaultCenter] = useState([64.1, 25.0]);
  const [formX, setFormX] = useState(25.0);
  const [formY, setFormY] = useState(64.1);
  const [modalOpen, setModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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
    handleChange, errors, message, handleSubmit, center, handleCoordinateClick,
  } = useForm(postTarget);

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

  return (
    <Container>
      <PageTitle text="Tee ilmoitus uudesta kohteesta" />
      <Submitmessage message={message} />
      <p>
        Suosittelemme yksityiskohtaisemman ilmoituksen tekemistä Museoviraston
        {' '}
        <a href="https://www.kyppi.fi/ilppari">sivuilla.</a>
      </p>
      <strong>Kohteen tiedot</strong>
      <Form
        onSubmit={handleSubmit}
        data-testid="testform"
        id="newtargetform"
      >
        <Form.Text muted>
          Kaikki paitsi lisäinfoa-kenttä ovat pakollisia
        </Form.Text>
        <Form.Group>
          <Form.Label>Kohteen nimi:</Form.Label>
          <Form.Control
            type="text"
            name="targetname"
            data-testid="testtargetname"
            id="newname"
            onChange={handleChange}
            isInvalid={!!errors.targetname}
          />
          <Form.Control.Feedback type="invalid">
            { errors.targetname }
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Ilmoittajan nimi:</Form.Label>
          <Form.Control
            type="text"
            name="divername"
            data-testid="testdivername"
            id="newdivername"
            onChange={handleChange}
            isInvalid={!!errors.divername}
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
          <Col lg>
            <Form.Group>
              <Form.Label>Puhelinnumero:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                data-testid="testphone"
                id="newphone"
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                { errors.phone }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg>
            <Form.Group>
              <Form.Label>Sähköpostiosoite:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                data-testid="testemail"
                id="newemail"
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
          <Col lg>
            <Form.Group>
              <Form.Label>Kuvaus kohteesta:</Form.Label>
              <Form.Control
                type="text"
                name="targetdescription"
                data-testid="testtargetdescription"
                id="newdescription"
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
          </Col>
          <Col lg>
            <Form.Group>
              <Form.Label>Vesialueen tai lähisaaren nimi:</Form.Label>
              <Form.Control
                type="text"
                name="locationname"
                data-testid="testlocationname"
                id="newlocationname"
                onChange={handleChange}
                isInvalid={!!errors.locationname}
              />
              <Form.Control.Feedback type="invalid">
                { errors.locationname }
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg>
            <Form.Group>
              <Form.Label>Pituuspiiri desimaaliasteina:</Form.Label>
              <Form.Control
                type="text"
                name="xcoordinate"
                data-testid="testxcoordinate"
                id="newx"
                value={formX}
                onChange={handleXCoordinateChange}
                isInvalid={!!errors.xcoordinate}
              />
              <Form.Control.Feedback type="invalid">
                { errors.xcoordinate }
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                esim. 25.34234323
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg>
            <Form.Group>
              <Form.Label>Leveyspiiri desimaaliasteina:</Form.Label>
              <Form.Control
                type="text"
                name="ycoordinate"
                data-testid="testycoordinate"
                id="newy"
                value={formY}
                onChange={handleYCoordinateChange}
                isInvalid={!!errors.ycoordinate}
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
        <Form.Group>
          <Form.Label>Koordinaattien määrittelytapa:</Form.Label>
          <Form.Control
            type="text"
            name="coordinateinfo"
            data-testid="testcoordinateinfo"
            id="newcoordinateinfo"
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
        <br />
        <Form.Group>
          <Form.Label>Paikannuksen tarkkuus:</Form.Label>
          <Form.Control
            type="text"
            name="diverinfo"
            data-testid="testdiverinfo"
            id="newdiverinfo"
            onChange={handleChange}
            isInvalid={!!errors.diverinfo}
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
        <Form.Check
          type="checkbox"
          id="privacy-checkbox"
          data-testid="privacy-checkbox"
          inline
          onChange={(e) => setTermsAccepted(e.currentTarget.checked)}
        />
        Hyväksyn
        <Button
          variant="link"
          onClick={() => setModalOpen(true)}
        >
          tietosuojaehdot
        </Button>
        <br />
        <Button
          variant="primary"
          type="submit"
          data-testid="submit"
          value="Submit"
          disabled={!termsAccepted}
        >
          Lähetä
        </Button>
      </Form>
      <Modal modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <>
          {Parser().parse(privacyText)}
          <Button onClick={() => setModalOpen(false)}>Sulje</Button>
        </>
      </Modal>
      <br />
    </Container>
  );
}
export default NewTargetForm;
