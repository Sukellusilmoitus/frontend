import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import List from './TargetList';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

function TargetList({ targets }) {
  const [filteredTargets, setFilteredTargets] = useState(targets);

  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/hylyt/${id}`);
  };

  if (targets === 'loading...' || filteredTargets === 'loading...') {
    return <LoadingSpinner />;
  }

  return (
    <Container fluid>
      <Row className="d-flex justify-content-end">
        <SearchBar targets={targets} setTargets={setFilteredTargets} />
      </Row>
      <List onRowClick={handleClick} targets={filteredTargets} />
    </Container>
  );
}

export default TargetList;
