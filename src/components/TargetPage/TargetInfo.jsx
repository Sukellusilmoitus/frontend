import React from 'react';
import {
  Container, Table,
} from 'react-bootstrap';
import dayjs from 'dayjs';

function TargetInfo({ target }) {
  return (
    <Container style={{ paddingLeft: 0 }}>
      <h3>Tietoja</h3>
      <Table bordered size="sm">
        <tbody>
          <tr>
            <td>Alue</td>
            <td>{target.properties.town}</td>
          </tr>
          <tr>
            <td>Osoite</td>
            <td><a href={target.properties.url}>{target.properties.url}</a></td>
          </tr>
          <tr>
            <td>Lisätty</td>
            <td>{dayjs(target.properties.created_at).format('DD.MM.YYYY')}</td>
          </tr>
          <tr>
            <td>Tyyppi</td>
            <td>{target.properties.type}</td>
          </tr>
          <tr>
            <td>Koordinaatit</td>
            <td>
              {target.geometry.coordinates[0]}
              {', '}
              {target.geometry.coordinates[1]}
            </td>
          </tr>
          <tr>
            <td>Koordinaattien tarkkuus</td>
            <td>{target.properties.location_accuracy || 'ei määritelty'}</td>
          </tr>
          <tr>
            <td>Tietolähde</td>
            <td>{target.properties.source}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default TargetInfo;
