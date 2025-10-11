import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SCMappingProvider } from './components/Mapping/SCMappingProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SCMappingProvider>
      <App />
    </SCMappingProvider>
  </StrictMode>,
)