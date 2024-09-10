import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import FullScreenButton from './components/FullScreenButton.jsx'
import BottomNavBar from './components/BottomNavBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FullScreenButton />
      <App />
      <BottomNavBar />
    </BrowserRouter>
  </StrictMode>,
)
