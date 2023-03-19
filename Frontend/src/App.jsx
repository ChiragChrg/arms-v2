import './App.css'
import { useEffect } from 'react';
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContextData } from './Hooks/useContextData'
import axios from 'axios';

import Content from './Components/Content';
import AdminDash from './Components/AdminDash/AdminDash';
import FileUpload from './Components/FileUpload/FileUpload';

import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';
import About from './Pages/About/About';
import Institution from './Pages/Institution/Institution';
import NewInstitute from './Pages/Institution/NewInstitute';
import InstituteInfo from './Pages/Institution/InstituteInfo/InstituteInfo';
import NewCourse from './Pages/Institution/InstituteInfo/NewCourse';
import CourseInfo from './Pages/Institution/CourseInfo/CourseInfo';
import NewSubject from './Pages/Institution/CourseInfo/NewSubject';
import SubjectInfo from './Pages/Institution/SubjectInfo/SubjectInfo';

function App() {
  const { userData, setUserData, isUserLoggedIn, authorizedUser, setIsUserLoggedIn, setIsUserFaculty, setIsReturningUser, setIsDarkTheme } = useContextData();

  useEffect(() => {
    const getFacultyLoggedIn = localStorage.getItem('arms-isFacultyLoggedIn');
    getFacultyLoggedIn === 'true' ? setIsUserFaculty(true) : setIsUserFaculty(false);

    const getUserLoggedIn = localStorage.getItem('arms-isUserLoggedIn');
    getUserLoggedIn === 'true' ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);

    if (getUserLoggedIn === 'true') {
      setIsReturningUser(true);
    }

    const getLocalUser = localStorage.getItem('arms-user');
    const LocalUser = JSON.parse(getLocalUser)
    setUserData(LocalUser);

    let getTheme = localStorage.getItem("arms-theme");
    document.body.setAttribute("data-theme", getTheme || "light");
    getTheme === "dark" ? setIsDarkTheme(true) : setIsDarkTheme(false);
  }, [])

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = userData?.token;
  }, [userData])


  return (
    <div className="App">
      <Browser>
        <Routes>
          {isUserLoggedIn && <Route element={<Content />}>
            <Route path="/dashboard" element={!authorizedUser ? <Dashboard /> : <AdminDash />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<h1>Contact</h1>} />
            <Route path="/institution" element={<Institution />} />
            <Route path="/institution/new" element={authorizedUser ? <NewInstitute /> : <h1>User Not Authorized</h1>} />
            <Route path="/institution/:institute" element={<InstituteInfo />} />
            <Route path="/institution/:institute/new" element={authorizedUser ? <NewCourse /> : <h1>User Not Authorized</h1>} />
            <Route path="/institution/:institute/:course" element={<CourseInfo />} />
            <Route path="/institution/:institute/:course/new" element={authorizedUser ? <NewSubject /> : <h1>User Not Authorized</h1>} />
            <Route path="/institution/:institute/:course/:subject" element={<SubjectInfo />} />
            <Route path="/institution/:institute/:course/:subject/upload" element={authorizedUser ? <FileUpload /> : <h1>User Not Authorized</h1>} />
          </Route>}

          <Route path="/" element={!isUserLoggedIn ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isUserLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isUserLoggedIn ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="*" element={<h1 style={{ color: "var(--text)" }}>Error 404</h1>} />
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
        theme="colored"
      />
    </div >
  )
}

export default App
