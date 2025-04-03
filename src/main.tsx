import React from 'react'
// import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'


ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>,
)
