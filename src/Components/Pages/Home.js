import React, { useState, useRef, useEffect } from 'react';
import { Form, Card, Row, Col, Container, Button } from 'react-bootstrap';
import { MdFavoriteBorder } from '@react-icons/all-files/md/MdFavoriteBorder'
// import {MdFavorite} from "@react-icons/all-files/md/MdFavorite";
import Modal from '../Modal/ModalPic';
import { GrView } from "@react-icons/all-files/gr/GrView"
import './CSS/Home.css';
import axios from "axios";

const Home = () => {
    const perPage = 30;
    const [photoId, setPhotoId] = useState(0)
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [datas, setDatas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const searchInputRef = useRef();
    const apiKey = '563492ad6f91700001000001cc75a1da232341c3bc555e612699dba5';

    useEffect(() => {
        let headersList = {
            "Accept": "application/json",
            "Authorization": apiKey
        }
        let reqOptions = {
            url: `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${pageNo}`,
            method: "GET",
            headers: headersList,
        }
        setLoading(true);
        axios.request(reqOptions).then(function (response) {
            setTotalPages(response.page);
            // console.log(response.data)
            setDatas([...datas, ...response.data.photos]);
            setLoading(false);
        }).catch(error => {
            console.warn(error);
        })
    }, [pageNo]);
    //For search api query
    const getSearchedPhotos = () => {

    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShow(true);
        let enteredSearchInput = searchInputRef.current.value;
        setSearchQuery(enteredSearchInput);
        searchInputRef.current.value = "";
        searchInputRef.current.blur();
        getSearchedPhotos();
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
            {!show && <div className="photos">
                {photoId > 0 && <Modal photoid={photoId} show={isShowModal} onHide={() => setShowModal(false)} />}
                <Container fluid>
                    <Row>
                        {datas?.map((data, index) => (
                            <Col style={{ width: '18rem', padding: '1rem' }} key={index}>
                                <Card.Img variant="top" src={data.src.large} />
                                <Card.Body>
                                    <Card.Title>Photographer:{data.photographer}</Card.Title>
                                </Card.Body>
                                <Card.Body style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
                                    <GrView onClick={() => {
                                        setPhotoId(data.id)
                                        setShowModal(true);
                                    }} onMouseOver={({ target }) => target.style.cursor = 'pointer'} />
                                    <MdFavoriteBorder onMouseOver={({ target }) => target.style.cursor = 'pointer'} />
                                </Card.Body>
                            </Col>
                        ))}
                    </Row>
                </Container>

                {totalPages !== pageNo && <div className="button-container">
                    <Button variant="success" onClick={() => setPageNo(pageNo + 1)}>{loading ? 'Loading...' : 'View More'}</Button>
                </div>}
            </div>}
            {show && <div>{searchQuery}</div>}
        </>
    )
}

export default Home