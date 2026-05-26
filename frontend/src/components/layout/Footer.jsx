import React from 'react'
import { Box, Typography, Link, Divider } from '@mui/material'
import { VideoLibrary } from '@mui/icons-material'

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6 }}>
      <Divider />
      <Box sx={{ px: 4, py: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{
            width: 26, height: 26, borderRadius: 1.5,
            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <VideoLibrary sx={{ fontSize: 14, color: '#fff' }} />
          </Box>
          <Typography variant="body2" fontWeight={700} className="gradient-text">VBlog</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['About', 'Privacy', 'Terms', 'Help'].map(l => (
            <Link key={l} href="#" underline="hover" color="text.secondary" variant="caption">{l}</Link>
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary">© 2024 VBlog. All rights reserved.</Typography>
      </Box>
    </Box>
  )
}
