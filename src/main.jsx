import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/global.css' // <-- Add this line here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
document.addEventListener('touchmove', function (e) {
    // If the user is dragging the main background workspace canvas area, prevent the scroll bounce
    if (e.target.classList.contains('desktop-environment') || e.target.classList.contains('desktop-wallpaper-canvas')) {
        e.preventDefault();
    }
}, { passive: false });