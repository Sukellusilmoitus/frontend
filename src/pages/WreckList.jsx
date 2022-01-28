import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import wreckService from '../services/wrecks';

function Wrecklist() {
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
          <p>Ladataan</p>
        )
        : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>nimi</th>
              </tr>
            </thead>
            <tbody>
              {wrecks.features.map((wreck) => (
                <tr key={wreck.properties.id}>
                  <td>{wreck.properties.id}</td>
                  <td>{wreck.properties.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  );
}

export default Wrecklist;
