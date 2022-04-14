import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container } from "react-bootstrap";
import Modal from "../Modal/ModalPic";
import { GrView } from "@react-icons/all-files/gr/GrView";
import LoaderWb from "../Loader/Loader";

const Favourites = (props) => {
  const [loader, setLoader] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoId, setPhotoId] = useState(0);
  const [isShowModal, setShowModal] = useState(false);
  const apiKey = "563492ad6f91700001000001cc75a1da232341c3bc555e612699dba5";

  useEffect(() => {
    if (localStorage.getItem("favPhotos") != null) {
      setLoader(true);
      const prevPhotos = JSON.parse(localStorage.getItem("favPhotos"));
      prevPhotos.map((phId) => {
        let headersList = {
          Accept: "application/json",
          Authorization: apiKey,
        };
        let reqOptions = {
          url: `https://api.pexels.com/v1/photos/${phId}`,
          method: "GET",
          headers: headersList,
        };
        axios
          .request(reqOptions)
          .then((response) => {
            setLoader(false);
            setPhotos((prev) => [...prev, response.data]);
          })
          .catch((err) => {
            setLoader(false);
            // console.log(err);
            alert("Something Wrong!!");
          });
      });
    }
  }, []);

  return (
    <>
      {loader && <LoaderWb />}
      {!loader && (
        <div>
          {photoId > 0 && (
            <Modal
              photoid={photoId}
              show={isShowModal}
              onHide={() => setShowModal(false)}
            />
          )}
          <Container fluid>
            <Row>
              {photos?.map((data, index) => (
                <Col style={{ width: "18rem", padding: "1rem" }} key={index}>
                  <Card.Img variant="top" src={data.src.large} width="50%" />
                  <Card.Body>
                    <Card.Title>
                      Photographer:{""} {data.photographer}
                    </Card.Title>
                  </Card.Body>
                  <Card.Body
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <GrView
                      onClick={() => {
                        setPhotoId(data.id);
                        setShowModal(true);
                      }}
                      onMouseOver={({ target }) =>
                        (target.style.cursor = "pointer")
                      }
                    />
                  </Card.Body>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Favourites;
