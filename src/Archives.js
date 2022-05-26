import * as contentful from 'contentful';
import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Accordion from 'react-bootstrap/Accordion'
// import Spinner from 'react-bootstrap/Spinner'
import { DateTime } from "luxon";
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate } from "react-router-dom";
import AboutMe from './AboutMe';

const Archives = (props) => {
    const [items, setItems] = useState([]);
    // const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

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
                setLoading(false)

            })

    }, []);

    const findItems = (e,month,year)=> {
      
       
        navigate("/" +year +'/'+month);

    }
    const getContents = () => {
        const contentsArray = []
        const blogsDateArray = []
        const blogsYearArray = []
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        items.forEach((item, index) => {
            let blogCreateDate = "";
            let blogYears = "";
            if (item.fields.blogPostDate) {
                blogCreateDate = DateTime.fromISO(item.fields.blogPostDate).toLocaleString(DateTime.DATETIME_FULL)
                blogYears = DateTime.fromISO(item.fields.blogPostDate).toFormat('yyyy')
            }
            blogsDateArray.push(blogCreateDate)
            blogsYearArray.push(blogYears)
        });

        let uniqYears = _.uniq(blogsYearArray)
        uniqYears.forEach((year, index) => {
            let monthsArray = blogsDateArray.filter(function (dt) {
                return new Date(dt).getFullYear().toString() === year.toString();
            });

            let monthFullNameArray = []
            monthsArray.forEach((m, index) => {
                monthFullNameArray.push(month[new Date(m).getMonth()])
            })
            let monthsCount = _.countBy(monthFullNameArray);
         

            const accordionBodyArray = []
            _.uniq(monthFullNameArray).forEach((item, index) => {
                accordionBodyArray.push( <a href="#"  onClick={(e) => findItems(e,Object.keys(monthsCount),year)}> 
                <ListGroup.Item>{Object.keys(monthsCount)} ({Object.values(monthsCount)})</ListGroup.Item>
                </a>)
            })

            contentsArray.push(
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>{year}</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {accordionBodyArray}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        })
        return contentsArray
    }


    return (
        <>
            <div >
                {loading ? null :
                getContents()
                }
                
            </div>

        </>
    )
}

export default Archives;