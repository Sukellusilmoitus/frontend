import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import wreckService from '../services/wrecks';

function WrecksList() {
  const [wrecks, setWrecks] = useState('loading...');

  async function getWreckData() {
    const data = await wreckService.getAllWrecks();
    data.features.sort((a, b) => (a.properties.name > b.properties.name ? 1 : -1));
    setWrecks(data);
  }

  useEffect(() => {
    getWreckData();
  }, []);

  return (
    <div>
      {(wrecks === 'loading...')
        ? (
          <div>
            <Spinner animation="border" />
            <p>Ladataan</p>

          </div>
        )
        : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Kaupunki</th>
                <th>Tyyppi</th>
                <th>Lähde</th>
              </tr>
            </thead>
            <tbody>
              {wrecks.features.map((wreck) => (
                <LinkContainer to={`/sukellusilmoitus/${wreck.properties.id}`} key={wreck.properties.id}>
                  <tr>
                    <td>{wreck.properties.name}</td>
                    <td>{wreck.properties.town}</td>
                    <td>{wreck.properties.type}</td>
                    <td><a href={wreck.properties.url}>{wreck.properties.source}</a></td>
                  </tr>
                </LinkContainer>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  );
}
export default WrecksList;
