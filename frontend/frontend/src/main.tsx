import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterConfig from './config/router.config'
import './assets/css/style.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterConfig />
  </StrictMode>,
)
