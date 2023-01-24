import './App.css'
import { BrowserRouter as Browser, Routes, Route, Navigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContextData } from './Hooks/useContextData'

import Landing from './pages/Landing/Landing'

function App() {
  const { isFacultyLoggedIn, setIsFacultyLoggedIn } = useContextData();

  // console.log(isFacultyLoggedIn);
  toast.success('Hello World');

  return (
    <div className="App">
      <Browser>
        <Routes>
          <Route path="/" element={!isFacultyLoggedIn ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<h1>Dashboards</h1>} />
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
