import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import targetService from '../services/targets';

function TargetsList(props) {
  const { onRowClick } = props;
  const [targets, setTargets] = useState('loading...');

  async function getTargetData() {
    const data = await targetService.getAllTargets();
    data.features.sort((a, b) => (a.properties.name > b.properties.name ? 1 : -1));
    setTargets(data.features);
  }

  useEffect(() => {
    getTargetData();
  }, []);

  return (
    <div>
      {(targets === 'loading...')
        ? (
          <div>
            <Spinner animation="border" />
            <p>Ladataan</p>

          </div>
        )
        : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Kaupunki</th>
                <th>Tyyppi</th>
                <th>Lähde</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((target) => (
                <tr
                  key={target.properties.id}
                  onClick={() => onRowClick(target.properties.id)}
                >
                  <td>{target.properties.name}</td>
                  <td>{target.properties.town}</td>
                  <td>{target.properties.type}</td>
                  <td><a href={target.properties.url}>{target.properties.source}</a></td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  );
}
export default TargetsList;
