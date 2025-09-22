import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import Login from './assets/components/login.tsx'
import Main from './assets/components/main.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
      <Toaster />
    </StrictMode>
  </BrowserRouter>
)
