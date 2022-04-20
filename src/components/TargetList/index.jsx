import { useState } from 'react';
import Helmet from 'react-helmet';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import List from './TargetList';
import SearchBar from './SearchBar';
import LoadingSpinner from '../LoadingSpinner';
import PageTitle from '../PageTitle';

function TargetList({ targets }) {
  const [filteredTargets, setFilteredTargets] = useState(targets);

  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/hylyt/${id}`);
  };

  // needed to avoid infinite LoadingSpinner on refresh
  if (targets !== 'loading...' && filteredTargets === 'loading...') setFilteredTargets(targets);

  if (targets === 'loading...' || filteredTargets === 'loading...') {
    return <LoadingSpinner />;
  }

  return (
    <Container fluid>
      <Helmet>
        <title>Hylkylistaus</title>
        <meta name="description" content="Lista kohteista, joille sukeltaa" />
      </Helmet>
      <PageTitle text="Hylkylistaus" />
      <Row className="d-flex">
        <SearchBar targets={targets} setTargets={setFilteredTargets} />
      </Row>
      <List onRowClick={handleClick} targets={filteredTargets} />
    </Container>
  );
}

export default TargetList;
