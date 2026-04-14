import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1424',
            color: '#e2e8f0',
            border: '1px solid rgba(56,189,248,0.2)',
            fontFamily: 'DM Sans, sans-serif',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#0ea5e9', secondary: '#070b14' } },
          error: { iconTheme: { primary: '#f87171', secondary: '#070b14' } },
        }}
      />
    </AuthProvider>
  </BrowserRouter>
)
