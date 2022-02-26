import { useState, useEffect } from 'react';
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
  const [filteredTargets, setFilteredTargets] = useState(targets);

  if (targets === 'loading...' || filteredTargets === 'loading...') {
    return <LoadingSpinner />;
  }

  useEffect(() => {
    setFilteredTargets(filter(targets, search, searchLimit));
  }, [search, searchLimit]);
  // const filteredTargets = filter(targets, search, searchLimit);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-end">
        <SearchBar
          setSearch={setSearch}
          setSearchLimit={setSearchLimit}
        />
      </Row>
      <List onRowClick={onRowClick} targets={filteredTargets} />
    </Container>
  );
}

export default TargetList;
