import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import List from './TargetList';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import { filter } from '../../util/filter';

const initialSearchLimit = {
  name: false,
  location: false,
  type: false,
  source: false,
};

function TargetList({ onRowClick, targets }) {
  const [search, setSearch] = useState('');
  const [searchLimit, setSearchLimit] = useState(initialSearchLimit);

  if (targets === 'loading...') {
    return <LoadingSpinner />;
  }

  const filteredTargets = filter(targets, search, searchLimit);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-end">
        <SearchBar setFilter={setSearch} setSearchLimit={setSearchLimit} />
      </Row>
      <List onRowClick={onRowClick} targets={filteredTargets} />
    </Container>
  );
}

export default TargetList;
