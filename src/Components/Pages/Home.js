import React, { useState, useRef, useEffect } from 'react'
import { Form, Card, Row, Col, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './CSS/Home.css';
import axios from "axios";

const Home = (props) => {
    const [datas, setDatas] = useState([]);
    const searchInputRef = useRef();
    const navigate = useNavigate();
    const apiKey = '563492ad6f91700001000001cc75a1da232341c3bc555e612699dba5';
    let enteredSearchInput;

    useEffect(() => {
        let headersList = {
            "Accept": "application/json",
            "Authorization": apiKey
        }
        let reqOptions = {
            url: "https://api.pexels.com/v1/curated?per_page=53&page=1",
            method: "GET",
            headers: headersList,
        }

        axios.request(reqOptions).then(function (response) {
            setDatas(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        enteredSearchInput = searchInputRef.current.value;
        props.searchInputHandler(enteredSearchInput)
        searchInputRef.current.value = "";
        searchInputRef.current.blur();
        navigate({ pathname: '/photos' }, { replace: false });
    }
    return (
        <>
            <div className="search-container">
                <div className="title-container">
                    <h1>The best free stock photos, royalty free images & videos shared by creators.</h1>
                </div>
                <div className="form-container">
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicSearch">
                            <Form.Control
                                type="search"
                                placeholder="Search..."
                                ref={searchInputRef}
                                required
                            />
                            <p><span>Suggested:</span>city  rain  coffee  dog  money  beautiful flowers  more</p>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <Container fluid>
                <Row>
                    {datas.photos?.map(data => (
                        <Col style={{ width: '18rem', padding: '1rem' }} key={data.id}>
                            <Card.Img variant="top" src={data.src.large} />
                            <Card.Body>
                                <Card.Title>Photographer:{data.photographer}</Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Home