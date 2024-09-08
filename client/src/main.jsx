import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import FullScreenButton from './components/FullScreenButton.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FullScreenButton />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
