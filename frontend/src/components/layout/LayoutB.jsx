import React, { useEffect } from 'react'
import { Box, useTheme, useMediaQuery, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Home, Whatshot, Search, VideoLibrary } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { fetchCategories } from '../../store/slices/categoriesSlice'
import { setSidebarOpen, setMobileNavValue } from '../../store/slices/uiSlice'

export default function Layout({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const sidebarOpen = useSelector(s => s.ui.sidebarOpen)
  const mobileNavValue = useSelector(s => s.ui.mobileNavValue)

  useEffect(() => {
    dispatch(fetchCategories())
    if (!isMobile) dispatch(setSidebarOpen(true))
  }, [dispatch, isMobile])

  const SIDEBAR_WIDTH = 240

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          mt: { xs: 7, sm: 8 },
          mb: { xs: 7, md: 0 },
          ml: { md: sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0 },
          transition: 'margin 0.3s ease',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1 }}>{children}</Box>
        {!isMobile && <Footer />}
      </Box>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1200 }} elevation={3}>
          <BottomNavigation
            value={mobileNavValue}
            onChange={(_, v) => {
              dispatch(setMobileNavValue(v))
              if (v === 0) navigate('/')
              else if (v === 1) navigate('/?sort=popular')
              else if (v === 2) navigate('/search')
              else if (v === 3) navigate('/library')
            }}
            sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}
          >
            <BottomNavigationAction label="Home" icon={<Home />} />
            <BottomNavigationAction label="Trending" icon={<Whatshot />} />
            <BottomNavigationAction label="Search" icon={<Search />} />
            <BottomNavigationAction label="Library" icon={<VideoLibrary />} />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  )
}
