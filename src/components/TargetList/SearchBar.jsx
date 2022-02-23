import { Form } from 'react-bootstrap';

function SearchBar({ setFilter }) {
  return (
    <Form className="mb-3 d-flex">
      <Form.Group controlId="search" className="d-flex flex-direction-column">
        <Form.Label visuallyHidden>Hae kohteista:</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Hae kohteista"
        />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
