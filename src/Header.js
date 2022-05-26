import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Header = (props) => {

    const {title} = props
    return ( 

        <Row style={{borderBottom:"1px solid #ce2127",backgroundColor:"white",padding:"5px"}}>
            <Col>
                   <p style={{fontSize:"25px"}}>{title}</p>
            </Col>
        </Row>
     );
}
export default Header;