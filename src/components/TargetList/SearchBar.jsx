import { useState } from 'react';
import { Form } from 'react-bootstrap';

function SearchBar({ setSearch, setSearchLimit }) {
  const [nameSelected, setNameSelected] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [typeSelected, setTypeSelected] = useState(false);
  const [sourceSelected, setSourceSelected] = useState(false);

  const handleChange = (value) => {
    setSearch(value);
  };

  const handleCheck = (field) => {
    switch (field) {
      case 'name':
        setNameSelected(!nameSelected);
        break;
      case 'location':
        setLocationSelected(!locationSelected);
        break;
      case 'type':
        setTypeSelected(!typeSelected);
        break;
      case 'source':
        setSourceSelected(!sourceSelected);
        break;
      default:
        break;
    }
    const searchLimit = {
      name: nameSelected,
      location: locationSelected,
      type: typeSelected,
      source: sourceSelected,
    };
    setSearchLimit(searchLimit);
  };

  return (
    <Form className="mb-3">
      <Form.Group controlId="search">
        <Form.Label visuallyHidden>Hae kohteista:</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Hae kohteista"
        />
      </Form.Group>
      <Form.Group className="ml-2">
        <Form.Label>Rajaa hakua ominaisuuden mukaan:</Form.Label>
        <br />
        <Form.Check
          type="checkbox"
          label="Nimi"
          inline
          value="name"
          onChange={() => handleCheck('name')}
          checked={nameSelected}
        />
        <Form.Check
          type="checkbox"
          label="Sijainti"
          inline
          value="location"
          onChange={() => handleCheck('location')}
          checked={locationSelected}
        />
        <Form.Check
          type="checkbox"
          label="Tyyppi"
          inline
          value="type"
          onChange={() => handleCheck('type')}
          checked={typeSelected}
        />
        <Form.Check
          type="checkbox"
          label="Lähde"
          inline
          value="source"
          onChange={() => handleCheck('source')}
          checked={sourceSelected}
        />
        <Form.Text className="text-muted">Jos mitään ei valittuna, haetaan näillä kaikilla.</Form.Text>
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
