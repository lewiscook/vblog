import React from 'react'
import { Box, Card, CardMedia, Typography, Avatar, Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function formatViews(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K'
  return n
}

function RelatedSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <Skeleton variant="rectangular" width={160} height={90} sx={{ borderRadius: 1.5, flexShrink: 0 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="90%" height={14} />
        <Skeleton variant="text" width="60%" height={12} sx={{ mt: 0.5 }} />
        <Skeleton variant="text" width="40%" height={12} sx={{ mt: 0.5 }} />
      </Box>
    </Box>
  )
}

export default function RelatedVideos({ videos, loading }) {
  const navigate = useNavigate()

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Array.from({ length: 6 }).map((_, i) => <RelatedSkeleton key={i} />)}
      </Box>
    )
  }

  if (!videos?.length) return null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>Up Next</Typography>
      {videos.map(video => (
        <Box
          key={video.id}
          onClick={() => navigate(`/video/${video.id}`)}
          sx={{ display: 'flex', gap: 1.5, cursor: 'pointer', borderRadius: 2, p: 0.5, '&:hover': { bgcolor: 'action.hover' } }}
        >
          <Box className="video-thumb-wrap" sx={{ width: 160, height: 90, borderRadius: 1.5, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <Box sx={{
              position: 'absolute', bottom: 4, right: 4,
              bgcolor: 'rgba(0,0,0,0.8)', color: '#fff',
              px: 0.6, py: 0.1, borderRadius: 0.5, fontSize: 10, fontWeight: 700,
            }}>
              {video.duration}
            </Box>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" fontWeight={600} className="line-clamp-2" sx={{ lineHeight: 1.4, display: 'block', mb: 0.4 }}>
              {video.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">{video.author.name}</Typography>
            <Typography variant="caption" color="text.disabled">{formatViews(video.views)} views</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
