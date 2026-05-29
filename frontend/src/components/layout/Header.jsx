import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  AppBar, Toolbar, IconButton, InputBase, Tooltip,
  Box, useMediaQuery, useTheme, Button,
} from '@mui/material'
import {
  Menu as MenuIcon, Search, Close, DarkMode, LightMode,
  VideoLibrary,
} from '@mui/icons-material'
import { toggleDarkMode, toggleSidebar } from '../../store/slices/uiSlice'
import { searchVideos, setSearchQuery } from '../../store/slices/videosSlice'
import SubscribeModal from '../common/SubscribeModal'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const darkMode = useSelector(s => s.ui.darkMode)
  const [searchOpen, setSearchOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [subscribeOpen, setSubscribeOpen] = useState(false)

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (!inputVal.trim()) return
    dispatch(searchVideos({ q: inputVal.trim() }))
    dispatch(setSearchQuery(inputVal.trim()))
    navigate(`/search?q=${encodeURIComponent(inputVal.trim())}`)
    setSearchOpen(false)
  }, [inputVal, dispatch, navigate])

  return (
    <AppBar position="fixed" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ gap: 1, minHeight: { xs: 56, sm: 64 } }}>
        <IconButton onClick={() => dispatch(toggleSidebar())} edge="start" size="small">
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        {(!isMobile || !searchOpen) && (
          <Box
            onClick={() => navigate('/')}
            sx={{ display: 'flex', alignItems: 'center', gap: 0.8, cursor: 'pointer', flexShrink: 0 }}
          >
            <Box sx={{
              width: 32, height: 32, borderRadius: 2,
              background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <VideoLibrary sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            {!isMobile && (
              <span className="gradient-text text-xl font-bold tracking-tight">VStoryBlog</span>
            )}
          </Box>
        )}

        <Box sx={{ flex: 1 }} />

        {/* Search bar — desktop */}
        {!isMobile && (
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex', alignItems: 'center',
              background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              borderRadius: 50, px: 2, py: 0.5, width: 280,
              border: '1px solid', borderColor: 'divider',
              transition: 'width 0.3s, box-shadow 0.2s',
              '&:focus-within': { width: 360, boxShadow: '0 0 0 2px #6C63FF44' },
            }}
          >
            <Search sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
            <InputBase
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Search..."
              sx={{ flex: 1, fontSize: 14 }}
            />
          </Box>
        )}

        {/* Search toggle — mobile */}
        {isMobile && searchOpen && (
          <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <InputBase
              autoFocus
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Search..."
              sx={{ flex: 1, fontSize: 14 }}
            />
            <IconButton size="small" onClick={() => { setSearchOpen(false); setInputVal('') }}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        )}

        {isMobile && !searchOpen && (
          <IconButton size="small" onClick={() => setSearchOpen(true)}>
            <Search />
          </IconButton>
        )}

        <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
          <IconButton size="small" onClick={() => dispatch(toggleDarkMode())}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          size="small"
          onClick={() => setSubscribeOpen(true)}
          sx={{
            borderRadius: 50, px: 2, fontWeight: 700, fontSize: 13,
            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
            '&:hover': { background: 'linear-gradient(135deg, #5a52e0, #e0506f)' },
            flexShrink: 0,
          }}
        >
          {isMobile ? 'Join' : 'Subscribe'}
        </Button>

        <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />

      </Toolbar>
    </AppBar>
  )
}
