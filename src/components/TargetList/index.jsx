import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import List from './TargetList';
import SearchBar from './SearchBar';
import LoadingSpinner from '../LoadingSpinner';
import targetService from '../../services/targets';
import PageTitle from '../PageTitle';

function TargetList({ listTargets }) {
  const [targets, setTargets] = useState('loading...');
  const [filteredTargets, setFilteredTargets] = useState(targets);

  const getTargets = async () => {
    const data = await targetService.getAllTargets();
    data.features.sort((a, b) => (a.properties.name > b.properties.name ? 1 : -1));
    setTargets(data.features);
  };
  useEffect(() => {
    if (listTargets === undefined) {
      getTargets();
    } else {
      setTargets(listTargets);
    }
  }, []);

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
      <PageTitle text="Hylkylistaus" />
      <Row className="d-flex">
        <SearchBar targets={targets} setTargets={setFilteredTargets} />
      </Row>
      <List onRowClick={handleClick} targets={filteredTargets} />
    </Container>
  );
}

export default TargetList;
