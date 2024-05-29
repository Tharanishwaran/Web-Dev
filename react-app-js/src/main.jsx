import React from 'react'
import ReactDOM from 'react-dom/client'
import {App, Hello, Hey} from './App.jsx' //Multiplr component import from single file
// import Hello from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <App />
    <Hello />    
    <Hey />  
  </React.StrictMode>,
); 
