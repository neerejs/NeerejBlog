import * as contentful from 'contentful';
import React, { useState, useEffect } from 'react';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



// import { BLOCKS, INLINES } from "@contentful/rich-text-types";


const BlogList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let contentfulClient = contentful.createClient({
            accessToken: '1EuIOgC3v2LcxuD2ambb2454ijXnjHKsheuWnPFjGPs',
            space: 'nvm4509pk8bp'
        });
        let PLAYER_CONTENT_TYPE_ID = 'blogs';

        contentfulClient.getEntries({
            content_type: PLAYER_CONTENT_TYPE_ID,
            order: '-fields.title', 
            // 'metadata.tags.sys.id[in]': 'html'
        })
            .then(function (entries) {
                setItems(entries.items);
                console.log(entries.items)
                // setLoading(false);
            })

    }, []);

    const getContents = () => {
        const contentsArray = []
        items.forEach((item, index) => {
            console.log(item.fields.title);
            contentsArray.push(<div>
                <Row>
                    <Col>
                        <p>{item.fields.title}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{documentToReactComponents(item.fields.body)}</p>
                    </Col>
                </Row>
            </div>

            )
        })
        return contentsArray;
    }


    return (
        <>
            <Container>
                {getContents()}
            </Container>

        </>
    )
}

export default BlogList;
