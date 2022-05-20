import * as contentful from 'contentful';
import React, { useState, useEffect } from 'react';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import _ from 'lodash'

import Container from 'react-bootstrap/Container'

// import { BLOCKS, INLINES } from "@contentful/rich-text-types";


const BlogList = () => {
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);


    useEffect(() => {
        let contentfulClient = contentful.createClient({
            accessToken: '1EuIOgC3v2LcxuD2ambb2454ijXnjHKsheuWnPFjGPs',
            space: 'nvm4509pk8bp'
        });
        let PLAYER_CONTENT_TYPE_ID = 'blogs';

        contentfulClient.getEntries({
            content_type: PLAYER_CONTENT_TYPE_ID,
            order: '-fields.title',

        })
            .then(function (entries) {
                setItems(entries.items);
                setTags(getTags(entries.items))

            })

    }, []);

    const getTaggedContents = (e, tag) => {
        e.preventDefault();

        if (tag === 'All') {

        }
        let contentfulClient = contentful.createClient({
            accessToken: '1EuIOgC3v2LcxuD2ambb2454ijXnjHKsheuWnPFjGPs',
            space: 'nvm4509pk8bp'
        });
        let PLAYER_CONTENT_TYPE_ID = 'blogs';

        if (tag === 'All') {
            contentfulClient.getEntries({
                content_type: PLAYER_CONTENT_TYPE_ID,
                order: '-fields.title',

            })
                .then(function (entries) {
                    setItems(entries.items);
                })
        }
        else {
            contentfulClient.getEntries({
                content_type: PLAYER_CONTENT_TYPE_ID,
                order: '-fields.title',
                'metadata.tags.sys.id[in]': tag
            })
                .then(function (entries) {
                    setItems(entries.items);
                })
        }

    }

    const getContents = () => {
        const contentsArray = []
        items.forEach((item, index) => {
            const tagArray = []
            item.metadata.tags.forEach((t, i) => {
                tagArray.push(<a href="#" style={{ marginRight: "10px" }}>{t.sys.id}</a>)
            })
            contentsArray.push(<div key={index}>
                <Row className="mt-5">
                    <Col>
                        <h3>{item.fields.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>{item.fields.shortDescription}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>{tagArray}</div>
                    </Col>
                </Row>
            </div>
            )

        })

        return contentsArray;
    }

    const getTags = (items) => {
        const allItemsTagsArray = []
        items.forEach((item, index) => {
            const itemsTagsArray = []
            item.metadata.tags.forEach((tag, i) => {
                itemsTagsArray.push(tag.sys.id)
            })
            allItemsTagsArray.push('All')
            allItemsTagsArray.push(...itemsTagsArray)
        })
        return _.uniq(allItemsTagsArray)


    }


    const renderTags = () => {
        const tagsArray = []
        tags.forEach((tag, index) => {
            tagsArray.push(<Button type="button" onClick={(e) => getTaggedContents(e, tag)} style={{ marginRight: "10px" }} href="">{tag}</Button>)

        })
        return tagsArray
    }

    return (
        <>
            <Container >
                <Row className="mt-5 mb-5">
                    <Col>
                        {renderTags()}
                    </Col>
                </Row>
                {getContents()}
            </Container>

        </>
    )
}

export default BlogList;