import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
// import { Carousel } from 'react-responsive-carousel'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';



const ModalPic = (props) => {
    const [photoDetails, setPhotoDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const apiKey = '563492ad6f91700001000001cc75a1da232341c3bc555e612699dba5';
    useEffect(() => {
        setIsLoading(true);
        let headersList = {
            "Accept": "application/json",
            "Authorization": apiKey
        }
        let reqOptions = {
            url: `https://api.pexels.com/v1/photos/${props.photoid}`,
            method: "GET",
            headers: headersList,
        }
        axios.request(reqOptions).then(function (response) {
            setPhotoDetails(response.data)
            setIsLoading(false);
        }).catch(error => {
            console.warn(error);
        })
    }, [props.photoid])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton></Modal.Header>
            {!isLoading && <Modal.Body style={{ textAlign: 'center' }}>
                {photoDetails != "" && <img src={photoDetails.src.medium} width='60%' />}
            </Modal.Body>}
            {isLoading && <Modal.Body style={{ textAlign: 'center' }}>
                Loading...
            </Modal.Body>}

        </Modal>
    )
}

export default ModalPic