import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ContextProvider from './Utils/Context'
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:5000'
// axios.defaults.baseURL = 'http://192.168.0.105:5000'
// axios.defaults.baseURL = 'https://arms-ry4i.onrender.com'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ContextProvider>
    <App />
  </ContextProvider>
  // </React.StrictMode>
)
