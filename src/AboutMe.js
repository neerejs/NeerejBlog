import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin , faTwitter} from '@fortawesome/free-brands-svg-icons'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'


import * as contentful from 'contentful';

const AboutMe = () => {

    const [aboutItems, setAboutItems] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [school, setSchool] = useState("");
    const [degrees, setDegrees] = useState("");
    const [bio, setBio] = useState("");
    const [imgurl, setImageurl] = useState("");


    const handleClose = () => setShow(false);
    const handleShow = (name,school,degrees,bio,imgurl) =>  {
    
        setName(name)
        setSchool(school)
        setDegrees(degrees)
        setBio(bio)
        setImageurl(imgurl)
        setShow(true);
    }
    
    

    useEffect(() => {

        let contentfulClient = contentful.createClient({
            accessToken: '1EuIOgC3v2LcxuD2ambb2454ijXnjHKsheuWnPFjGPs',
            space: 'nvm4509pk8bp'
        });
     
            let Aboutme_CONTENT_TYPE_ID = 'aboutMe';

            contentfulClient.getEntries({
                content_type: Aboutme_CONTENT_TYPE_ID,
                limit: 1,
                order: 'sys.createdAt'
               
            })
                .then(function (entries) {
                  console.log ("about: "+ entries.items)
                  setAboutItems(entries.items)
                })

    }, []);

    const getAboutMe =() => {
        const aboutArray = []
        aboutItems.forEach ((about,index) => {
            aboutArray.push(
                <Row style={{backgroundColor:"white"}} >
                <Col >
               
                <Card  style={{marginTop:"10px"}}>
                <Card.Img variant="top" src={about.fields.imgUrl} />
                <Card.Body>
                    <Card.Title style={{marginBottom:"10px"}}>{about.fields.name}</Card.Title>
                    <Card.Subtitle>{about.fields.degrees}</Card.Subtitle>
                    <Card.Subtitle style={{marginTop:"5px"}}>{about.fields.school}</Card.Subtitle>
                    <Card.Text style={{marginTop:"10px"}}>
                      {about.fields.bio}
                     
                        </Card.Text>
                        <Card.Text>
                        <a href="#/"  onClick={(e) => handleShow (about.fields.name,about.fields.degrees,about.fields.school,about.fields.bio,about.fields.imgUrl)} >Read More</a>
                        </Card.Text>
                    <Card.Text>
                    <a href="https://www.linkedin.com/in/neerejselvakumar"> 
                     <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://twitter.com/neerejs123"> 
                     <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </Card.Text>
                         </Card.Body>
            </Card>
            </Col>
            </Row>
            )
        })

        return aboutArray 
    }


    return (

        <>
        {getAboutMe()}

       

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name} <br></br><span className="modal-subtitle">{school}</span> <br></br><span className="modal-subtitle">{degrees}</span></Modal.Title>
         
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col md={3}>
            <Image fluid src={imgurl}></Image>
            </Col>
        <Col md={9}>
                {bio}
            </Col>

        </Row>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
        </>
     );
}
 


export default AboutMe;

