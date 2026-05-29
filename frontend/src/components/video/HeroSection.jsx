import React from 'react'
import { Box } from '@mui/material'

export default function HeroSection() {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: { xs: '16/9', md: '21/7' },
        minHeight: 220,
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#000',
      }}
    >
      <video
        src="/videos/quantum_space_representation.mp4"
        autoPlay
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </Box>
  )
}
