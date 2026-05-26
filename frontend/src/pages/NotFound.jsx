import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { VideoLibraryOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2, p: 3, textAlign: 'center' }}>
      <VideoLibraryOutlined sx={{ fontSize: 80, color: 'text.disabled' }} />
      <Typography variant="h2" fontWeight={800} className="gradient-text">404</Typography>
      <Typography variant="h6" fontWeight={600}>Page Not Found</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 1 }}>
        Go Back Home
      </Button>
    </Box>
  )
}
