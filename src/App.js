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
import LoaderWb from "./Components/Loader/Loader";

const App = () => {
  const authCtx = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowSearchedPhotos, setShowSearchedPhotos] = useState(false);
  const navigate = useNavigate();

  const searchQueryValidHandler = (isSearchValid) => {
    console.log(isSearchValid);
  };

  const searchQueryHandler = (query) => {
    setShowSearchedPhotos(true);
    setSearchQuery(query);
    navigate({ pathname: "/searchedphotos" }, { replace: false });
  };

  return (
    <>
      <NavigationBar isShowSearchedPhotos={isShowSearchedPhotos} />
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route
          path="/"
          element={<Home searchQueryHandler={searchQueryHandler} />}
        />
        {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup />} />}
        {!authCtx.isLoggedIn && <Route path="/signin" element={<Signin />} />}
        {authCtx.isLoggedIn && <Route path="/fav" element={<Favourites />} />}
        {isShowSearchedPhotos && authCtx.isLoggedIn && (
          <Route
            path="/searchedphotos"
            element={
              <SearchedPhotos
                searchQueryValidHandler={searchQueryValidHandler}
                searchQuery={searchQuery}
              />
            }
          />
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/changepassword" element={<ChangePassword />} />
        )}
      </Routes>
    </>
  );
};

export default App;
