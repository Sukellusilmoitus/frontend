import { Row } from 'react-bootstrap';

function PageTitle({ text }) {
  return (
    <Row className="bg-light p-1 text-muted" style={{ borderRadius: '10px' }}>
      <h1 className="m-1" style={{ fontSize: 24 }}>{text}</h1>
    </Row>
  );
}

export default PageTitle;
