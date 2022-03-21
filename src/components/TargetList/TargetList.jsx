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
              </tr>
            </thead>
            <tbody>
              {targets.map((target) => (
                <tr
                  key={target.properties.id}
                  onClick={() => onRowClick(target.properties.id)}
                >
                  <td><button type="button" className="btn btn-link p-0">{target.properties.name}</button></td>
                  <td>{target.properties.town}</td>
                  <td>{target.properties.type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  );
}
export default List;
