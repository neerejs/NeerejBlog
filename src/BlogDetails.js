import * as contentful from 'contentful';
import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import {MARKS } from "@contentful/rich-text-types";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import _ from 'lodash'
import Spinner from 'react-bootstrap/Spinner'

import Container from 'react-bootstrap/Container'
import { DateTime } from "luxon";
import Header from './Header.js'
import RichText from '@madebyconnor/rich-text-to-jsx';

const BlogDetails= (props) => {
    const [item, setItem] = useState();
    // const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const { blogid} = useParams();
  
    useEffect(() => {
  
        let contentfulClient = contentful.createClient({
            accessToken: '1EuIOgC3v2LcxuD2ambb2454ijXnjHKsheuWnPFjGPs',
            space: 'nvm4509pk8bp'
        });
        contentfulClient.getEntry (blogid)
            .then(function (entry) {
                setItem(entry)
                setLoading(false)
                console.log(entry)
            })
          // eslint-disable-next-line
    }, []);



    const getContents = () => {
        const contentsArray = []
        // items.forEach((item, index) => {
            const tagArray = []
            item.metadata.tags.forEach((t, i) => {
                tagArray.push(<a href="#/" style={{ marginRight: "10px" }}>{t.sys.id}</a>)
            })
            let blogCreateDate="";
            if (item.fields.blogPostDate)
            {
                blogCreateDate = DateTime.fromISO(item.fields.blogPostDate).toLocaleString(DateTime.DATETIME_FULL)
            }
           
            contentsArray.push(<div >

              

                <Row className="mt-5">
                
                    <Col md={12} style={{backgroundColor:'white'}}>
                    <Header title="Blogs" />
                        <h3>{item.fields.title}</h3>
                    </Col>
                    <Col md={12} style={{backgroundColor:'white'}}>
                        <p>{blogCreateDate}</p>
                    </Col>
                </Row>
                <Row>
                    <Col style={{backgroundColor:'white'}}>
                        <p>{item.fields.shortDescription}</p>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        {/* <div>{documentToReactComponents(item.fields.body,renderOptions)}</div> */}
                        <RichText
                          richText={item.fields.body}
                          overrides={{
                            [MARKS.CODE]: (node) => {
                              return <div className="code-snippet">{node.children}</div>
                            }
                          }}
                        />
                    </Col>
                </Row>
                

                <Row>
                    <Col>
                        <div>{tagArray}</div>
                    </Col>
                </Row>
            </div>
            )

        // })

        return contentsArray;
    }


    // const renderOptions = {
    //     renderNode: {
    //       [INLINES.EMBEDDED_ENTRY]: (node, children) => {
    //         // target the contentType of the EMBEDDED_ENTRY to display as you need
    //         if (node.data.target.sys.contentType.sys.id === "codeBlock") {
    //           return (
    //             <pre>
    //               <code>{node.data.target.fields.code}</code>
    //             </pre>
    //           );
    //         }
    
    //         if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
    //           return (
    //             <iframe
    //               src={node.data.target.fields.embedUrl}
    //               height="100%"
    //               width="100%"
    //               frameBorder="0"
    //               scrolling="no"
    //               title={node.data.target.fields.title}
    //               allowFullScreen={true}
    //             />
    //           );
    //         }
    //       },
    
    //       [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
    //         // render the EMBEDDED_ASSET as you need
    
    //         return (
    //           <div >
    //             <Image fluid 
    //               src={`https://${node.data.target.fields.file.url}`}
              
    //             //   height={node.data.target.fields.file.details.image.height}
    //             //   width={node.data.target.fields.file.details.image.width}

    //               alt={node.data.target.fields.description} />
    //           </div>
    
    //         );
    //       }
    //     }
    //   }

    return (
        <>
            <Container >
                <Row className="mt-5 mb-5">
                    <Col >
                     {loading ?
                     
                     
                     <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>

                     :getContents()}
                    </Col>
                </Row>

            </Container>

        </>
    )
}

export default BlogDetails;