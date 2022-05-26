import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import BlogList from './BlogList';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import codeImage from './code.png';
import Archives from './Archives';
import BlogDetails from './BlogDetails';
function App() {
  return (
    <div className="App">
      {/* <Container>
        <Row className='mt-3'>
          <Col md={3}>

          <BlogList />
          </Col>
          <Col md={6}>

            
        <BlogDetails />

          </Col>
          <Col md={3}>
            <Archives />
          </Col>
        </Row>
      </Container> */}
    </div>
  );
}

export default App;
