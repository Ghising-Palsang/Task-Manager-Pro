import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterConfig from './config/router.config'
import './assets/css/style.css'
import { AuthProvider } from './context/auth.context';
import { TokenProvider } from './context/token.contex';



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokenProvider>
      <AuthProvider>
        <RouterConfig />
      </AuthProvider>
    </TokenProvider>
  </StrictMode>
);
