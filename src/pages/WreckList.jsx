import React, { useState, useEffect } from 'react';
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
  console.log(wrecks.features);
  return (
    <div>
      <p>Hylyt</p>
      {/* {wrecks !== 'loading...' && (
        <th>{wrecks.features['0'].properties.id}</th>
        <th>{wrecks.features['0'].properties.name}</th>
      )} */}
      {(wrecks === 'loading...')
        ? (
          <p>Ladataan</p>
        )
        : (
          <table>
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
          </table>
        )}
    </div>
  );
}

export default Wrecklist;
