import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import './Quicklinks.css'


import * as contentful from 'contentful';

const Quicklinks = () => {

    const [linkItems, setLinkItems] = useState([]);

    useEffect(() => {

        let contentfulClient = contentful.createClient({
            accessToken: '1EuIOgC3v2LcxuD2ambb2454ijXnjHKsheuWnPFjGPs',
            space: 'nvm4509pk8bp'
        });

        let links_CONTENT_TYPE_ID = 'quicklinks';

        contentfulClient.getEntries({
            content_type: links_CONTENT_TYPE_ID,
            order: '-fields.title'

        })
            .then(function (entries) {
                console.log("links: " + entries.items)
                setLinkItems(entries.items)
            })

    }, []);

    const getLinks = () => {
        const linkArray = []
        linkItems.forEach((link, index) => {
            linkArray.push(<>
                
                <Row style={{ backgroundColor: "white", paddingTop:"10px",paddingBottom:"10px" }} >
                    
                    <Col >
                        
                        {/* <Card  style={{marginTop:"10px"}}>
               
                <Card.Body>
                    <Card.Title style={{marginBottom:"10px"}}>{link.fields.title}</Card.Title>
                    
                    <Card.Subtitle style={{marginTop:"5px"}}>{link.fields.url}</Card.Subtitle>
                    
                         </Card.Body>
            </Card> */}

                        <ListGroup>
                        <ListGroup.Item>
                            <a href={link.fields.url} target="_blank" rel="noreferrer">

                                {link.fields.title}
                            </a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                </>
            )
        })

        return linkArray
    }


    return (

        <div className="linkColor">
            {getLinks()}
        </div>
    );
}



export default Quicklinks;

