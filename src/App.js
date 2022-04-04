import React, { useState } from 'react'
import { useNavigate, Route, Routes} from 'react-router-dom';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Home from './Components/Pages/Home';
import SearchResultPh from './Components/Pages/SearchResultPh';
import Signin from './Components/Pages/Signin';
import Signup from './Components/Pages/Signup';
import Career from './Components/Pages/Career';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();




  const searchInputHandler = (searchInput) => {
    setSearchQuery(searchInput);
    navigate('/photos')
  }



  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home searchInputHandler={searchInputHandler} />}>
          <Route path='photos' element={<SearchResultPh searchInput={searchQuery} />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/career' element={<Career />} />
      </Routes>
    </>
  )
}

export default App