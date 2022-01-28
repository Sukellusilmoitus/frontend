import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import wreckService from '../services/wrecks';

function WrecksList() {
  const [wrecks, setWrecks] = useState('loading...');

  useEffect(() => {
    async function getWreckData() {
      const data = await wreckService.getAllWrecks();
      setWrecks(data);
    }
    getWreckData();
  }, []);
  return (
    <div>
      <p>Hylyt</p>
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
                <tr key={wreck.properties.id}>
                  <td>{wreck.properties.name}</td>
                  <td>{wreck.properties.town}</td>
                  <td>{wreck.properties.type}</td>
                  <td><a href={wreck.properties.url}>{wreck.properties.source}</a></td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  );
}
export default WrecksList;
