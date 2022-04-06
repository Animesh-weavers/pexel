import React, { useState, useEffect } from 'react';
import { Form, Card, Row, Col, Container, Button } from 'react-bootstrap';
import { MdFavoriteBorder } from '@react-icons/all-files/md/MdFavoriteBorder'
// import {MdFavorite} from "@react-icons/all-files/md/MdFavorite";
import Modal from '../Modal/ModalPic';
import { GrView } from "@react-icons/all-files/gr/GrView"
import './CSS/Home.css';
import axios from "axios";

const SearchedPhotos = (props) => {
    const searchQuery = props.searchQuery;
    const navSearchQuery = props.navSearchQuery;
    const perPage = 30;
    const [navSearchedDatas, setNavSearchedDatas] = useState([]);
    const [photoId, setPhotoId] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [datas, setDatas] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [whichShow, SetWhichShow] = useState(false);
    const apiKey = '563492ad6f91700001000001cc75a1da232341c3bc555e612699dba5';
    useEffect(() => {

        // console.log("Home");
        let headersList = {
            "Accept": "application/json",
            "Authorization": apiKey
        }
        let reqOptions = {
            url: `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${perPage}&page=${pageNo}`,
            method: "GET",
            headers: headersList,
        }
        setLoading(true);
        axios.request(reqOptions).then(function (response) {
            setTotalPages(response.page);
            setDatas([...datas, ...response.data.photos]);
            setLoading(false);
        }).catch(error => {
            console.warn(error);
        })
    }, [searchQuery, pageNo]);
    // useEffect(() => {
    //     if (navSearchQuery !== "") {
    //         // console.log("nav")
    //         let headersList = {
    //             "Accept": "application/json",
    //             "Authorization": apiKey
    //         }
    //         let reqOptions = {
    //             url: `https://api.pexels.com/v1/search?query=${navSearchQuery}&per_page=${perPage}&page=${pageNo}`,
    //             method: "GET",
    //             headers: headersList,
    //         }
    //         setLoading(true);
    //         axios.request(reqOptions).then(function (response) {
    //             setTotalPages(response.page);
    //             setNavSearchedDatas([...navSearchedDatas, ...response.data.photos]);
    //             SetWhichShow(true);
    //             setLoading(false);
    //         }).catch(error => {
    //             console.warn(error);
    //         })
    //     }
    //     return () => { console.log("nav return") }
    // }, [navSearchQuery, pageNo])
    // console.log(navSearchQuery);
    return (
        <>
            <div className="photos">
                {photoId > 0 && <Modal photoid={photoId} show={isShowModal} onHide={() => setShowModal(false)} />}
                <Container fluid>
                    <Row>
                        {datas?.map((data, index) => (
                            <Col style={{ width: '18rem', padding: '1rem' }} key={index}>
                                <Card.Img variant="top" src={data.src.large} />
                                <Card.Body>
                                    <Card.Title>Photographer:{" "}{data.photographer}</Card.Title>
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
            </div>
            {/* {whichShow && <div className="photos">
                {photoId > 0 && <Modal photoid={photoId} show={isShowModal} onHide={() => setShowModal(false)} />}
                <Container fluid>
                    <Row>
                        {navSearchedDatas?.map((data, index) => (
                            <Col style={{ width: '18rem', padding: '1rem' }} key={index}>
                                <Card.Img variant="top" src={data.src.large} />
                                <Card.Body>
                                    <Card.Title>Photographer:{" "}{data.photographer}</Card.Title>
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
            </div>
            } */}
        </>
    )
}

export default SearchedPhotos