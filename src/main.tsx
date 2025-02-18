import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { Toaster } from './components/ui/toaster.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './config.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} >
      <BrowserRouter>
      <Provider store={store} >
        <Toaster />
        <App />
      </Provider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
