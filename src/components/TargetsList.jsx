import React, { useState, useEffect } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
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
          <Table striped bordered hover size="sm" responsive style={{ overflowWrap: 'break-word', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Kaupunki</th>
                <th>Lisätietoa</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((target) => (
                <tr
                  key={target.properties.id}
                >
                  <td>{target.properties.name}</td>
                  <td>{target.properties.town}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button onClick={() => onRowClick(target.properties.id)} style={{ minWidth: '100%' }}>
                      Lisätietoa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  );
}
export default TargetsList;
