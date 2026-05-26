import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Divider, useMediaQuery, useTheme, Chip,
} from '@mui/material'
import {
  Home, Whatshot, VideoLibrary, Subscriptions,
  Computer, Flight, SportsEsports, Restaurant,
  FitnessCenter, MusicNote, Palette, School,
  ExpandMore,
} from '@mui/icons-material'
import { setSidebarOpen } from '../../store/slices/uiSlice'

const CATEGORY_ICONS = {
  technology: Computer, travel: Flight, gaming: SportsEsports,
  cooking: Restaurant, fitness: FitnessCenter, music: MusicNote,
  art: Palette, education: School,
}

const NAV_ITEMS = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Trending', icon: Whatshot, path: '/?sort=popular' },
  { label: 'Library', icon: VideoLibrary, path: '/library' },
  { label: 'Subscriptions', icon: Subscriptions, path: '/subscriptions' },
]

const DRAWER_WIDTH = 240

export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const open = useSelector(s => s.ui.sidebarOpen)
  const categories = useSelector(s => s.categories.items)

  const handleNav = (path) => {
    navigate(path)
    if (isMobile) dispatch(setSidebarOpen(false))
  }

  const content = (
    <Box sx={{ width: DRAWER_WIDTH, pt: '64px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <List sx={{ px: 1, pt: 1 }}>
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
          <ListItemButton
            key={label}
            selected={location.pathname === path || (path === '/' && location.pathname === '/')}
            onClick={() => handleNav(path)}
            sx={{
              borderRadius: 2, mb: 0.5,
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(255,101,132,0.08))',
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 38 }}><Icon sx={{ fontSize: 20 }} /></ListItemIcon>
            <ListItemText primary={label} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ mx: 2, my: 1 }} />

      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1, color: 'text.secondary', textTransform: 'uppercase' }}>
          Categories
        </Typography>
      </Box>

      <List sx={{ px: 1, flex: 1, overflowY: 'auto' }}>
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.slug] || School
          const isActive = location.pathname === `/category/${cat.slug}`
          return (
            <ListItemButton
              key={cat.id}
              selected={isActive}
              onClick={() => handleNav(`/category/${cat.slug}`)}
              sx={{
                borderRadius: 2, mb: 0.5,
                '&.Mui-selected': {
                  background: `${cat.color}22`,
                  '& .MuiListItemIcon-root': { color: cat.color },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38 }}>
                <Icon sx={{ fontSize: 20, color: isActive ? cat.color : 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText
                primary={cat.name}
                primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }}
              />
              <Chip
                label={cat.videoCount}
                size="small"
                sx={{ height: 18, fontSize: 10, background: 'transparent', border: '1px solid', borderColor: 'divider' }}
              />
            </ListItemButton>
          )
        })}
      </List>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          © 2024 VBlog · All rights reserved
        </Typography>
      </Box>
    </Box>
  )

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => dispatch(setSidebarOpen(false))}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, borderRight: '1px solid', borderColor: 'divider' },
      }}
    >
      {content}
    </Drawer>
  )
}
