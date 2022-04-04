import React, { useState, useRef, useEffect } from 'react'
import { Form, Card } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import './CSS/Home.css';
import axios from "axios";

const Home = (props) => {
    const [show, setShow] = useState(false);
    const [datas, setDatas] = useState([]);
    const searchInputRef = useRef();
    const apiKey = '563492ad6f91700001000001cc75a1da232341c3bc555e612699dba5';


    useEffect(() => {
        let headersList = {
            "Accept": "application/json",
            "Authorization": apiKey
        }

        let reqOptions = {
            url: "https://api.pexels.com/v1/curated?per_page=50&page=1",
            method: "GET",
            headers: headersList,
        }

        axios.request(reqOptions).then(function (response) {
            setDatas(response.data);
            // console.log(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        let enteredSearchInput = searchInputRef.current.value;
        props.searchInputHandler(enteredSearchInput)
        searchInputRef.current.value = "";
        setShow(true);

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
            {!show && <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {datas.photos?.map((data) => (<Card style={{ width: '18rem' }} key={data.id}>
                    <Card.Img variant="top" src={data.src.large} />
                    <Card.Body>
                        <Card.Title>Photographer:{data.photographer}</Card.Title>
                    </Card.Body>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>))}
            </div>}
            {show && <Outlet />}
        </>
    )
}

export default Home