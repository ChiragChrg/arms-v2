import './App.css'
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContextData } from './Hooks/useContextData'

import Content from './Components/Content';
import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  const { setUserData, isUserLoggedIn, setIsUserLoggedIn, isUserFaculty, setIsUserFaculty, setIsReturningUser } = useContextData();

  useEffect(() => {
    const getFacultyLoggedIn = localStorage.getItem('arms-isFacultyLoggedIn');
    getFacultyLoggedIn === 'true' ? setIsUserFaculty(true) : setIsUserFaculty(false);

    const getUserLoggedIn = localStorage.getItem('arms-isUserLoggedIn');
    getUserLoggedIn === 'true' ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);

    if (getUserLoggedIn === 'true') {
      setIsReturningUser(true);
    }

    const getLocalUser = localStorage.getItem('arms-user');
    setUserData(JSON.parse(getLocalUser));

    let getTheme = localStorage.getItem("arms-theme");
    document.body.setAttribute("data-theme", getTheme || "light");
  }, [])

  // console.log(isFacultyLoggedIn);

  return (
    <div className="App">
      <Browser>
        <Routes>
          {isUserLoggedIn && <Route element={<Content />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
          </Route>}

          <Route path="/" element={!isUserLoggedIn ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isUserLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isUserLoggedIn ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </Browser>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar="false"
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        theme="dark"
      />
    </div>
  )
}

export default App
