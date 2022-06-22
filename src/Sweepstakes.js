import React, { useState } from 'react';
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
//import Container from 'react-bootstrap/Container'
import * as contentfulManagement from 'contentful-management';
import Alert from 'react-bootstrap/Alert';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';

export const Sweepstakes = () => {

  let [FullName, setFullName] = useState('');
  let [EmailAddress, setEmailAddress] = useState('');
  const [show, setShow] = useState(false);


  const handleClick = (event) => {
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
            'en-US': EmailAddress
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




  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Number is no valid'),

    //   .required('Number is required'),
  })
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
          <Form>
            {/* <Form.Group> */}
            <TextField label="First Name" name="firstName" type="text"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {/* <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Full Name"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group> */}

            <TextField label="last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Phone" name="phone" type="number" />
            {show ? <Alert key='success' variant='success' dismissible onClose={() => setShow(false)}> Record created successfully  </Alert> : null}
            <Button variant="primary" type="submit" onClick={(e) => handleClick(e)}>
              Submit
         </Button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default Sweepstakes;