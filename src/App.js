import React, { useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Home from './Components/Pages/Home';
import Signin from './Components/Pages/Signin';
import Signup from './Components/Pages/Signup';
import Career from './Components/Pages/Career';
import SearchedPhotos from './Components/Pages/SearchedPhotos';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [isShowSearchedPhotos, setShowSearchedPhotos] = useState(false);
  const navigate = useNavigate();

  const searchQueryHandler = (query) => {
    setShowSearchedPhotos(true);
    setSearchQuery(query)
    navigate({ pathname: '/searchedphotos' }, { replace: false });
  }
  const navSearchQueryHandler = (query) => {
    setNavSearchQuery(query)
  }
  // console.log(navSearchQuery)
  return (
    <>
      <NavigationBar isShowSearchedPhotos={isShowSearchedPhotos} navSearchQueryHandler={navSearchQueryHandler} />
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path='/' element={<Home searchQueryHandler={searchQueryHandler} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/career' element={<Career />} />
        {isShowSearchedPhotos && <Route path='/searchedphotos' element={<SearchedPhotos searchQuery={searchQuery} navSearchQuery={navSearchQuery} />} />}
      </Routes>
    </>
  )
}

export default App