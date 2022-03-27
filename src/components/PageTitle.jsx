import { Row } from 'react-bootstrap';

function PageTitle({ text }) {
  return (
    <Row className="bg-light p-1 text-muted" style={{ borderRadius: '10px' }}>
      <h2 className="m-1" style={{ fontSize: 18 }}>{text}</h2>
    </Row>
  );
}

export default PageTitle;
