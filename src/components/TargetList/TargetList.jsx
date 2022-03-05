import { Table } from 'react-bootstrap';

function List({ onRowClick, targets }) {
  return (
    <div data-testid="target-list">
      {(targets.length === 0)
        ? (
          <div>
            <p>Kohteita ei löytynyt</p>
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
