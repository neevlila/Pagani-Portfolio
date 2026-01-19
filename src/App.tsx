"use client"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import Error404 from '@/components/error-404'
import HomePage from '@/pages/HomePage'
import CollectionPage from '@/pages/CollectionPage'
import ModelDetailPage from '@/pages/ModelDetailPage'

const PaganiShowcase = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pagani-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collection/:slug" element={<ModelDetailPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default PaganiShowcase
