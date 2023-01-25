import './App.css'
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContextData } from './Hooks/useContextData'

import Content from './Components/Content';
import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';

function App() {
  const { isUserLoggedIn, setIsUserLoggedIn, isUserFaculty, setIsUserFaculty, isDarkTheme } = useContextData();

  useEffect(() => {
    const isFacultyLoggedIn = localStorage.getItem('arms-isFacultyLoggedIn');
    isFacultyLoggedIn === 'true' ? setIsUserFaculty(true) : setIsUserFaculty(false);

    const isUserLoggedIn = localStorage.getItem('arms-isUserLoggedIn');
    isUserLoggedIn === 'true' ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);

    let getTheme = localStorage.getItem("arms-theme");
    document.body.setAttribute("data-theme", getTheme);
  }, [])

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
    localStorage.setItem("arms-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme])

  // console.log(isFacultyLoggedIn);

  return (
    <div className="App">
      <Browser>
        <Routes>
          {isUserLoggedIn && <Route element={<Content />}>
            <Route path="/dashboard" element={<h1>Dashboards</h1>} />
          </Route>}

          <Route path="/" element={!isUserLoggedIn ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isUserLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isUserLoggedIn ? <Landing /> : <Navigate to="/dashboard" />} />
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
