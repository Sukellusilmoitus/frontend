import { Spinner } from 'react-bootstrap';

function LoadingSpinner() {
  return (
    <div data-testid="loading-spinner">
      <Spinner animation="border" />
      <p>Ladataan</p>
    </div>
  );
}

export default LoadingSpinner;
