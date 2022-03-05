import { Spinner } from 'react-bootstrap';

function LoadingSpinner() {
  return (
    <div>
      <Spinner animation="border" />
      <p>Ladataan</p>
    </div>
  );
}

export default LoadingSpinner;
