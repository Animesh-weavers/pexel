import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { MdFavoriteBorder } from "@react-icons/all-files/md/MdFavoriteBorder";
// import {MdFavorite} from "@react-icons/all-files/md/MdFavorite";
import { BiErrorCircle } from "@react-icons/all-files/bi/BiErrorCircle";
import Modal from "../Modal/ModalPic";
import { GrView } from "@react-icons/all-files/gr/GrView";
import "./CSS/Home.css";
import axios from "axios";
import LoaderWb from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SearchedPhotos = (props) => {
  const [inValidStatus, setInValidStatus] = useState(false);
  const navigate = useNavigate();
  const searchQuery = props.searchQuery;
  const perPage = 27;
  const [photoId, setPhotoId] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [datas, setDatas] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowViewMore, setIsShowViewMore] = useState(true);
  const apiKey = "563492ad6f91700001000001cc75a1da232341c3bc555e612699dba5";

  useEffect(() => {
    let headersList = {
      Accept: "application/json",
      Authorization: apiKey,
    };
    let reqOptions = {
      url: `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${perPage}&page=${pageNo}`,
      method: "GET",
      headers: headersList,
    };
    setLoading(true);
    axios
      .request(reqOptions)
      .then(function (response) {
        // console.log(response);
        setTotalPages(response.page);
        if (response.data.photos.length === 0) {
          setIsShowViewMore(false);
        }
        if (response.data.total_results == 0) {
          setInValidStatus(true);
        }
        setDatas([...datas, ...response.data.photos]);
        // props.showNavbarHandler(false);
        setLoading(false);
      })
      .catch((error) => {
        // console.warn(error);
        // console.log(error.response);
      });
  }, [searchQuery, pageNo]);

  return (
    <>
      {loading && <LoaderWb />}
      {!loading && (
        <div>
          <div className="photos">
            {photoId > 0 && (
              <Modal
                photoid={photoId}
                show={isShowModal}
                onHide={() => setShowModal(false)}
              />
            )}
            <Container fluid>
              <Row>
                {datas?.map((data, index) => (
                  <Col style={{ width: "18rem", padding: "1rem" }} key={index}>
                    <Card.Img variant="top" src={data.src.large} />
                    <Card.Body>
                      <Card.Title>Photographer: {data.photographer}</Card.Title>
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
                      <MdFavoriteBorder
                        onMouseOver={({ target }) =>
                          (target.style.cursor = "pointer")
                        }
                      />
                    </Card.Body>
                  </Col>
                ))}
              </Row>
            </Container>
            {totalPages !== pageNo && isShowViewMore && (
              <div className="button-container">
                <Button variant="success" onClick={() => setPageNo(pageNo + 1)}>
                  {loading ? "Loading..." : "View More"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {!loading && inValidStatus && (
        <div
          style={{
            width: "100%",
            height: "92vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>
            {" "}
            <BiErrorCircle /> Please Enter A Valid Input
          </h1>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SearchedPhotos;
