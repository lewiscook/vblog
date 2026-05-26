import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Chip, Avatar, IconButton, Skeleton } from '@mui/material'
import { PlayArrow, ChevronLeft, ChevronRight, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function formatViews(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K'
  return n
}

export default function HeroSection({ videos, loading }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!videos?.length) return
    const t = setInterval(() => setActive(i => (i + 1) % videos.length), 6000)
    return () => clearInterval(t)
  }, [videos?.length])

  if (loading || !videos?.length) {
    return <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: { xs: '16/9', md: '21/7' }, borderRadius: 3 }} />
  }

  const video = videos[active]

  return (
    <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', aspectRatio: { xs: '16/9', md: '21/7' }, minHeight: 220, cursor: 'pointer' }}
      onClick={() => navigate(`/video/${video.id}`)}
    >
      {/* Background image */}
      <Box
        key={video.id}
        sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${video.thumbnail})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'opacity 0.6s ease',
          animation: 'fadeIn 0.6s ease',
        }}
      />

      {/* Gradient overlay */}
      <Box sx={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
      }} />

      {/* Content */}
      <Box sx={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        p: { xs: 2, md: 4 }, maxWidth: { md: '55%' },
      }}>
        <Chip
          label={video.category.toUpperCase()}
          size="small"
          sx={{ mb: 1, bgcolor: 'primary.main', color: '#fff', fontWeight: 700, fontSize: 10, width: 'fit-content', letterSpacing: 1 }}
        />
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: '#fff', mb: 1, lineHeight: 1.3, fontSize: { xs: '1rem', md: '1.4rem' } }}
          className="line-clamp-2"
        >
          {video.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Avatar src={video.author.avatar} sx={{ width: 24, height: 24 }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>{video.author.name}</Typography>
          <Visibility sx={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>{formatViews(video.views)} views</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          size="small"
          sx={{ width: 'fit-content', borderRadius: 2, px: 2 }}
          onClick={e => { e.stopPropagation(); navigate(`/video/${video.id}`) }}
        >
          Watch Now
        </Button>
      </Box>

      {/* Dot indicators */}
      <Box sx={{ position: 'absolute', bottom: 12, right: 16, display: 'flex', gap: 0.7 }}>
        {videos.map((_, i) => (
          <Box
            key={i}
            onClick={e => { e.stopPropagation(); setActive(i) }}
            sx={{
              width: i === active ? 20 : 6, height: 6, borderRadius: 3,
              bgcolor: i === active ? 'primary.main' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }}
          />
        ))}
      </Box>

      {/* Arrows */}
      {videos.length > 1 && (
        <>
          <IconButton
            size="small"
            onClick={e => { e.stopPropagation(); setActive(i => (i - 1 + videos.length) % videos.length) }}
            sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            size="small"
            onClick={e => { e.stopPropagation(); setActive(i => (i + 1) % videos.length) }}
            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}
    </Box>
  )
}
