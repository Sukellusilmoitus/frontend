import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import List from './TargetList';
import SearchBar from './SearchBar';
import { filter } from '../../util/filter';

function TargetList({ onRowClick, targets }) {
  const [search, setSearch] = useState('');

  const filteredTargets = filter(targets, search);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-end">
        <SearchBar setFilter={setSearch} />
      </Row>
      <List onRowClick={onRowClick} targets={filteredTargets} />
    </Container>
  );
}

export default TargetList;
