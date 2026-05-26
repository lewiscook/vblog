import React, { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import getTheme from './theme'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import VideoDetail from './pages/VideoDetail'
import CategoryPage from './pages/CategoryPage'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'

export default function App() {
  const darkMode = useSelector(s => s.ui.darkMode)
  const theme = useMemo(() => getTheme(darkMode ? 'dark' : 'light'), [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={darkMode ? 'dark' : ''}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  )
}
