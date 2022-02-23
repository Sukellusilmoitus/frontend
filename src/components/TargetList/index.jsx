import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import List from './TargetList';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import { filter } from '../../util/filter';

function TargetList({ onRowClick, targets }) {
  const [search, setSearch] = useState('');

  if (targets === 'loading...') {
    return <LoadingSpinner />;
  }

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
