import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { filter } from '../../util/filter';

function SearchBar({ targets, setTargets }) {
  const [search, setSearch] = useState('');
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTargets(filter(targets, search, {
      name: nameSelected,
      location: locationSelected,
      type: typeSelected,
      source: sourceSelected,
    }));
  };

  return (
    <Form
      id="search-form"
      className="mb-3 d-flex align-items-center search-form"
      onSubmit={(e) => handleSubmit(e)}
      data-testid="search-form"
    >
      <Form.Group controlId="search" className="mr-3">
        <Form.Label visuallyHidden>Hae kohteista:</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Hae kohteista"
        />
      </Form.Group>
      <Form.Group className="mx-3">
        <Form.Label>Rajaa hakua ominaisuuden mukaan:</Form.Label>
        <br />
        <Form.Check
          id="name"
          type="checkbox"
          label="Nimi"
          inline
          value="name"
          onChange={() => handleCheck('name')}
          checked={nameSelected}
        />
        <Form.Check
          id="location"
          type="checkbox"
          label="Sijainti"
          inline
          value="location"
          onChange={() => handleCheck('location')}
          checked={locationSelected}
        />
        <Form.Check
          id="type"
          type="checkbox"
          label="Tyyppi"
          inline
          value="type"
          onChange={() => handleCheck('type')}
          checked={typeSelected}
        />
        <Form.Check
          id="source"
          type="checkbox"
          label="Lähde"
          inline
          value="source"
          onChange={() => handleCheck('source')}
          checked={sourceSelected}
        />
        <Form.Text className="text-muted">Jos mitään ei valittuna, haetaan näillä kaikilla.</Form.Text>
      </Form.Group>
      <Form.Group className="mx-3">
        <Button type="submit" className="btn-success px-5">Hae</Button>
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
