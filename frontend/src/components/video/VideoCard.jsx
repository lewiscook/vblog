import React from 'react'
import { Card, CardContent, Avatar, Typography, Box, Chip } from '@mui/material'
import { PlayArrow, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function formatViews(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K'
  return n
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'Today'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export default function VideoCard({ video }) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/video/${video.id}`)}
      sx={{ cursor: 'pointer', bgcolor: 'background.paper', overflow: 'hidden' }}
    >
      {/* Thumbnail */}
      <Box className="video-thumb-wrap" sx={{ position: 'relative', aspectRatio: '16/9', bgcolor: 'action.hover' }}>
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <Box className="play-overlay">
          <Box className="play-btn-circle">
            <PlayArrow sx={{ color: '#fff', fontSize: 24, ml: 0.5 }} />
          </Box>
        </Box>
        {/* Duration badge */}
        <Box sx={{
          position: 'absolute', bottom: 6, right: 6,
          bgcolor: 'rgba(0,0,0,0.8)', color: '#fff',
          px: 0.8, py: 0.2, borderRadius: 1,
          fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
        }}>
          {video.duration}
        </Box>
      </Box>

      <CardContent sx={{ pt: 1.5, pb: '12px !important' }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Avatar
            src={video.author.avatar}
            sx={{ width: 34, height: 34, flexShrink: 0, cursor: 'pointer' }}
            onClick={e => { e.stopPropagation() }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              className="line-clamp-2"
              sx={{ lineHeight: 1.4, mb: 0.5, fontSize: '0.85rem' }}
            >
              {video.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {video.author.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
              <Visibility sx={{ fontSize: 12, color: 'text.disabled' }} />
              <Typography variant="caption" color="text.disabled">
                {formatViews(video.views)} · {timeAgo(video.publishedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
