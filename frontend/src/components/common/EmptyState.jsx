import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { VideoLibraryOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function EmptyState({ title = 'Nothing here yet', message = 'Try a different search or explore categories.', action }) {
  const navigate = useNavigate()
  return (
    <Box sx={{ textAlign: 'center', py: 10, px: 2 }}>
      <VideoLibraryOutlined sx={{ fontSize: 72, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" fontWeight={600} gutterBottom>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{message}</Typography>
      {action ? action : (
        <Button variant="contained" onClick={() => navigate('/')}>Go Home</Button>
      )}
    </Box>
  )
}
