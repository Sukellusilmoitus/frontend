import { Table, Spinner } from 'react-bootstrap';

function List({ onRowClick, targets }) {
  return (
    <div>
      {(targets.length === 0)
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
export default List;
