import React, { useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import * as contentfulManagement from 'contentful-management';
import Alert from 'react-bootstrap/Alert';


function Sweepstakes() {
  let [FullName, setFullName] = useState('');
  let [EmailAddress, setEmailAddress] = useState('');
  const [show, setShow] = useState(false);
  

const handleClick =(event) => {
  event.preventDefault();
  setShow(true);
  const client = contentfulManagement.createClient({
    accessToken: 'CFPAT-oUCFauW8e8B0z1etnV5Lx0V0eEegb51Dy4d__550f1k'
  })
  
  
  client.getSpace('nvm4509pk8bp')
  .then((space) => space.getEnvironment('master'))
  .then((environment) => environment.createEntry('giveaway', {
    fields: {
      name: {
        'en-US': FullName
      },
      email: {
        'en-US':EmailAddress
      }
    }
  }))
  .then((entry) => {
    console.log(entry)
    entry.publish()
    //alert ("Thank you. your comments are save successfully.")
    setFullName('')
    setEmailAddress('')
   

  })
  .catch((error) => {
    
  })

}


 return (
    <div>
      <Container>
        <Row>
          <Col>
          <Form>
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Full Name" 
          value={FullName}
          onChange={(e) =>setFullName(e.target.value)}
          />
       
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmailAddress">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Email" 
          value={EmailAddress}
          onChange={(e) =>setEmailAddress(e.target.value)}
          
          />
        </Form.Group>

        {show?<Alert key='success' variant='success' dismissible onClose={() => setShow(false)}> Record created successfully  </Alert> : null}
        <Button variant="primary" type="submit" onClick={(e) =>handleClick(e)}>
          Submit
        </Button>
      </Form>
          
          </Col>
        </Row>
      </Container>
   

    </div>
  );
}

export default Sweepstakes;
