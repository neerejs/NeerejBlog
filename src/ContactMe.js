import React, { useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import * as contentfulManagement from 'contentful-management';
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom';
import './contactMe.css';
import { Formik } from 'formik';
import * as Yup from 'yup';


function ContactMe() {
  
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({

        name: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Name is required"),
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
        comments: Yup.string()
            .min(2, "*Names must have at least 2 characters")
            .max(100, "*Names can't be longer than 100 characters")
            .required("*Name is required"),

    });



    return (
        
        <>
            <Container>
                <Row>
                    <Col>
                        <Formik initialValues={{ name: "", email: "", comments: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)
                                setSubmitting(true);
                                setShow(true);



                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));


                                    const client = contentfulManagement.createClient({
                                        accessToken: 'CFPAT-oUCFauW8e8B0z1etnV5Lx0V0eEegb51Dy4d__550f1k'
                                    })


                                    client.getSpace('nvm4509pk8bp')
                                        .then((space) => space.getEnvironment('master'))
                                        .then((environment) => environment.createEntry('giveaway', {
                                            fields: {
                                                name: {
                                                    'en-US': values.name
                                                },
                                                email: {
                                                    'en-US': values.email
                                                },
                                                comments: {
                                                    'en-US': values.comments
                                                }
                                            }
                                        }))
                                        .then((entry) => {
                                            console.log(entry)
                                            entry.publish()
                                        })
                                        .catch((error) => {

                                        })


                                    resetForm();

                                    setSubmitting(false);
                                }, 500);


                                // setSubmiting(true);



                            }}
                        >

                            {({ values, handleChange, handleSubmit, handleBlur, touched, errors, isSubmitting
                            }) => (



                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name"
                                            name="name"
                                            onChange={handleChange}
                                            value={values.name}
                                            onBlur={handleBlur}
                                            className={touched.name && errors.name ? "error" : null}
                                        />
                                        {touched.name && errors.name ? (
                                            <div className="error-message">{errors.name}</div>
                                        ) : null}

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            onBlur={handleBlur}
                                            className={touched.email && errors.email ? "error" : null}
                                        />
                                        {touched.email && errors.email ? (
                                            <div className="error-message">{errors.email}</div>
                                        ) : null}
                                    </Form.Group>


                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control as="textarea" rows={5} placeholder="Enter Comments"
                                            name="comments"
                                            onChange={handleChange}
                                            value={values.comments}
                                            onBlur={handleBlur}
                                            className={touched.comments && errors.comments ? "error" : null}
                                        />
                                        {touched.comments && errors.comments ? (
                                            <div className="error-message">{errors.comments}</div>
                                        ) : null}
                                    </Form.Group>

                                    {show ? <Alert key='success' variant='success' dismissible onClose={() => {
                                        setShow(false)
                                        navigate('/')
                                    }}> Record created successfully  </Alert> : null}
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </>
    );
}




export default ContactMe;
