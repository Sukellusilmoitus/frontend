import React from 'react';
import {
  Container, Table,
} from 'react-bootstrap';

function TargetInfo({ target }) {
  // console.log(target);
  return (
    <Container>
      <Table bordered size="sm">
        <tbody>
          <tr>
            <td>Kaupunki</td>
            <td>{target.properties.town}</td>
          </tr>
          <tr>
            <td>Osoite</td>
            <td><a href={target.properties.url}>{target.properties.url}</a></td>
          </tr>
          <tr>
            <td>Lisätty</td>
            <td>{target.properties.created_at}</td>
          </tr>
          <tr>
            <td>Tyyppi</td>
            <td>{target.properties.type}</td>
          </tr>
          <tr>
            <td>Koordinaatit</td>
            <td>
              {target.geometry.coordinates[1]}
              {', '}
              {target.geometry.coordinates[0]}
            </td>
          </tr>
          <tr>
            <td>Koordinaattien tarkkuus</td>
            <td>{target.properties.location_accuracy}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default TargetInfo;
