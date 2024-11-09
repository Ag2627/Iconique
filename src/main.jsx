import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import "./index.css"
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID="46428342730-n64meq1fb9s013ot3ng5aiuhffm0n0ch.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>,
  </Provider>
)
//provider gives the access of store in redux
