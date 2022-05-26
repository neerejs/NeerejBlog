import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFontAwesome,faLinkedin } from '@fortawesome/free-brands-svg-icons'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


import * as contentful from 'contentful';

const AboutMe = () => {

    const [aboutItems, setAboutItems] = useState([]);

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
                    <a href="https://www.linkedin.com/in/neerejselvakumar"> 
                     <FontAwesomeIcon icon={faLinkedin} />
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
        </>
     );
}
 


export default AboutMe;

