import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID="46428342730-n64meq1fb9s013ot3ng5aiuhffm0n0ch.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>,
)
