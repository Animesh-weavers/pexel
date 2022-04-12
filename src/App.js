import React, { useState, useContext } from "react";
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

const App = () => {
  const authCtx = useContext(AuthContext);
  const [isNotSearchQueryValid, setNotSearchQueryValid] = useState(false);
  const [isShowNavbar, setIsShowNavbarHandler] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowSearchedPhotos, setShowSearchedPhotos] = useState(false);
  const navigate = useNavigate();

  const searchQueryHandler = (query) => {
    setShowSearchedPhotos(true);
    setSearchQuery(query);
    navigate({ pathname: "/searchedphotos" }, { replace: false });
  };
  const showNavbarHandler = (showNav) => {
    setIsShowNavbarHandler(showNav);
  };
  const notSearchQueryValid = (isValid) => {
    console.log(isValid);
    setNotSearchQueryValid(isValid);
  };
  if (isNotSearchQueryValid) {
    alert("Enter Valid Input!!");
  }

  return (
    <>
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
              isNotSearchQueryValid={isNotSearchQueryValid}
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
                notSearchQueryValid={notSearchQueryValid}
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
