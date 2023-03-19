import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ContextProvider from './Utils/Context'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
// axios.defaults.baseURL = 'https://arms-ry4i.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ContextProvider>
    <App />
  </ContextProvider>
  // </React.StrictMode>
)
