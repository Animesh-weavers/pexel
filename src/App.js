import React from 'react'
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Home from './Components/Pages/Home';
import Signin from './Components/Pages/Signin';
import Signup from './Components/Pages/Signup';
import Career from './Components/Pages/Career';

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/career' element={<Career />} />
      </Routes>
    </>
  )
}

export default App