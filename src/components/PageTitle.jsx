import { Row } from 'react-bootstrap';

function PageTitle({ text }) {
  return (
    <Row className="bg-light p-1 text-muted" style={{ borderRadius: '10px' }}>
      <p className="m-1" style={{ fontSize: 18 }}>{text}</p>
    </Row>
  );
}

export default PageTitle;
