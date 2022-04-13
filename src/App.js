import React, { useState, useContext,useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Home from "./Components/Pages/Home";
import Signin from "./Components/Pages/Signin";
import Signup from "./Components/Pages/Signup";
import SearchedPhotos from "./Components/Pages/SearchedPhotos";
import Favourites from "./Components/Pages/Favourites";
import ForgetPassword from "./Components/Pages/ForgetPassword";
import ChangePassword from "./Components/Pages/ChangePassword";
import AuthContext from "./Store/auth-context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const authCtx = useContext(AuthContext);
  const [isShowNavbar, setIsShowNavbarHandler] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowSearchedPhotos, setShowSearchedPhotos] = useState(false);
  const navigate = useNavigate();
  const apiKey = "563492ad6f91700001000001cc75a1da232341c3bc555e612699dba5";
  let favPhotosArr = [];



  const searchQueryHandler = (query) => {
    setShowSearchedPhotos(true);
    setSearchQuery(query);
    navigate({ pathname: "/searchedphotos" }, { replace: false });
  };
  const showNavbarHandler = (showNav) => {
    setIsShowNavbarHandler(showNav);
  };
  //fav handler
  const favAddHandler = (id) => {
    // console.log(id);
    let headersList = {
      Accept: "application/json",
      Authorization: apiKey,
    };
    let reqOptions = {
      url: `https://api.pexels.com/v1/photos/${id}`,
      method: "GET",
      headers: headersList,
    };
    axios
      .request(reqOptions)
      .then((response) => {
        // console.log(response);
        favPhotosArr.push(response.data.id);
        //store in localStorage
        if (localStorage.getItem("favPhotos") == null) {

          localStorage.setItem("favPhotos", JSON.stringify(favPhotosArr));
        } else {
          const prevFavPhotos = JSON.parse(localStorage.getItem("favPhotos"));
          favPhotosArr = favPhotosArr.concat(prevFavPhotos);
          // console.log(favPhotosArr);
          favPhotosArr = [...new Set(favPhotosArr)];
          localStorage.setItem("favPhotos", JSON.stringify(favPhotosArr));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* <ToastContainer /> */}
      {!isShowNavbar && (
        <NavigationBar isShowSearchedPhotos={isShowSearchedPhotos} />
      )}
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route
          path="/"
          element={
            <Home
              searchQueryHandler={searchQueryHandler}
              showNavbarHandler={showNavbarHandler}
              favAddHandler={favAddHandler}
            />
          }
        />
        {!authCtx.isLoggedIn && (
          <Route
            path="/signup"
            element={<Signup showNavbarHandler={showNavbarHandler} />}
          />
        )}
        {!authCtx.isLoggedIn && (
          <Route
            path="/signin"
            element={<Signin showNavbarHandler={showNavbarHandler} />}
          />
        )}
        {authCtx.isLoggedIn && <Route path="/fav" element={<Favourites />} />}
        {isShowSearchedPhotos && authCtx.isLoggedIn && (
          <Route
            path="/searchedphotos"
            element={
              <SearchedPhotos
                searchQuery={searchQuery}
                showNavbarHandler={showNavbarHandler}
              />
            }
          />
        )}
        {!authCtx.isLoggedIn && (
          <Route
            path="/forgetpassword"
            element={<ForgetPassword showNavbarHandler={showNavbarHandler} />}
          />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path="/changepassword"
            element={<ChangePassword showNavbarHandler={showNavbarHandler} />}
          />
        )}
      </Routes>
    </>
  );
};

export default App;
