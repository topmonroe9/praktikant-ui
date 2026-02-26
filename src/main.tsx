import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const Scene3D = lazy(() => import('./Scene3D.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/scene"
          element={
            <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-ivory font-body text-ink-muted">Загрузка сцены...</div>}>
              <Scene3D />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
