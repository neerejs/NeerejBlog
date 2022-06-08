import * as contentful from 'contentful';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import _ from 'lodash'
import './BlogList.css'

import Container from 'react-bootstrap/Container'
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import Archives from './Archives';
import { useParams } from "react-router-dom";

import AboutMe from './AboutMe';
import Header from './Header';
import Quicklinks from './Quicklinks';

import Sweepstakes from './Sweepstakes';
import Form from 'react-bootstrap/Form'
import ContactPic from './assets/contactme.png';


// import { BLOCKS, INLINES } from "@contentful/rich-text-types";


const BlogList = (props) => {
    const [items, setItems] = useState([]);
    const [SearchText, SetSearchText] = useState([]);


    const [tags, setTags] = useState([]);
    let navigate = useNavigate();
    const { year, month } = useParams();


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
                filterItems(entries.items);
                // setItems(entries.items);
                setTags(getTags(entries.items))
            })


        // eslint-disable-next-line
    }, [year]);




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

    const searchBlog = (e) => {
        e.preventDefault();
        const client = contentful.createClient({
            accessToken: '1EuIOgC3v2LcxuD2ambb2454ijXnjHKsheuWnPFjGPs',
            space: 'nvm4509pk8bp'
        })

        let PLAYER_CONTENT_TYPE_ID = 'blogs';

        client.getEntries({
            content_type: PLAYER_CONTENT_TYPE_ID,
            'query': SearchText
        })
            .then((response) => {
                setItems(response.items)
                console.log(response.items)
            })
            .catch(console.error)

    }

    const filterItems = (items) => {
        if (year && month) {
            let result = items.filter(function (dt) {
                console.log(dt.fields.blogPostDate)
                const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let blogYear = new Date(dt.fields.blogPostDate).getFullYear().toString()
                let blogMonth = monthArray[new Date(dt.fields.blogPostDate).getMonth()]
                return blogYear === year && blogMonth === month;
            });
            setItems(result)
        }
        else {
            setItems(items)
        }


    }
    const getContents = () => {
        const contentsArray = []
        items.forEach((item, index) => {
            const tagArray = []
            item.metadata.tags.forEach((t, i) => {
                tagArray.push(<a href="#/" style={{ marginRight: "10px" }}>{t.sys.id}</a>)
            })
            let blogCreateDate = "";
            if (item.fields.blogPostDate) {
                blogCreateDate = DateTime.fromISO(item.fields.blogPostDate).toLocaleString(DateTime.DATETIME_FULL)
            }


            contentsArray.push(<div key={index}>

                <Row className="mt-5">
                    <Col md={12}>
                        <h3>{item.fields.title}</h3>
                    </Col>
                    <Col md={12}>
                        <p>{blogCreateDate}</p>
                    </Col>
                </Row>
                <Row >
                    <Col >
                        <p>{item.fields.shortDescription}</p>
                    </Col>

                </Row>
                <Row>
                    <a className="link-color" href="#/" onClick={(e) => navigateToDetails(e, item.sys.id)} > Read More
                    </a>
                </Row>

                {/* <Row>
                    <Col>
                        <div>{tagArray}</div>
                    </Col>
                </Row> */}
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


    const navigateToDetails = (e, id) => {
        navigate("/details/" + id);
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
                <Row className="mt-4 mb-5 gx-5">


                    <Col md={3} >

                        <div >
                            <Row>
                                <Col>
                                    <Row style={{ marginBottom: "20px" }}>
                                        <Col>
                                            <Header title="About Me" />
                                            <AboutMe />
                                        </Col>
                                    </Row>

                                    <Header title="Giveaway" />
                                    <Row style={{ backgroundColor: "white", paddingBottom: '10px' }}>
                                        <Col>
                                            <Sweepstakes />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>



                    <Col md={6} >
                        <div >
                            <Header title="Blogs" />
                            <Row style={{ backgroundColor: "white", paddingTop: '20px' }}>
                                <Row>
                                    <Col md={8}>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formsearchtext">

                                                <Form.Control type="email" placeholder="Enter the text to search"
                                                    value={SearchText}
                                                    onChange={(e) => SetSearchText(e.target.value)}
                                                />

                                            </Form.Group>


                                        </Form>
                                    </Col>
                                    <Col md={4}>
                                        <Button variant="primary" type="submit" onClick={(e) => searchBlog(e)}  >
                                            Search
                                        </Button>
                                    </Col>

                                </Row>
                                <Col >
                                    <Row className="mt-5">
                                        <Col>
                                            {renderTags()}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {getContents()}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col md={3}>
                        <div >
                            <Header title="Archives" />
                            <Row style={{ backgroundColor: "white", paddingTop: "10px", paddingBottom: "10px", marginBottom: "20px" }}>
                                <Col >
                                    <Archives />
                                </Col>
                            </Row>

                            <Header title="Quicklinks" />
                            <Row style={{ backgroundColor: "white" }}>
                                <Col >

                                    <Quicklinks />
                                </Col>
                            </Row>
                            <Row style={{ backgroundColor: "white", marginTop: "20px", padding:"20px"}}>
                                <Col>
                                    {/* <h4 style={{ paddingTop: '10px' }}>Contact Us</h4>
                                    <ContactMe /> */}


                                    <a href="/Contactus">
                                    <img className="img-fluid" alt="img" src={ContactPic}/> 
                                    </a>

                                    {/* <a href="/Contactus">
                                        <Image fluid src={ContactPic}> </Image>
                                    </a> */}
                                </Col>

                            </Row>
                        </div>
                    </Col>


                </Row>




            </Container>

        </>
    )
}

export default BlogList;