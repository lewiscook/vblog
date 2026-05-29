import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Typography, Avatar, Button, Chip, IconButton,
  Divider, Tooltip, Skeleton, Grid,
} from '@mui/material'
import {
  ThumbUp, ThumbUpOutlined, Share, Bookmark,
  BookmarkBorder, MoreHoriz, ArrowBack, Visibility,
} from '@mui/icons-material'
import { fetchVideoById, fetchRelated, likeVideo, viewVideo, clearCurrent } from '../store/slices/videosSlice'
import VideoPlayer from '../components/video/VideoPlayer'
import RelatedVideos from '../components/video/RelatedVideos'

function formatViews(n) {
  if (!n) return '0'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return Math.floor(n / 1e3) + 'K'
  return n.toString()
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function VideoDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)

  const { current: video, currentLoading, related, likedIds } = useSelector(s => s.videos)
  const isLiked = likedIds.includes(id)

  useEffect(() => {
    dispatch(fetchVideoById(id))
    dispatch(fetchRelated(id))
    dispatch(viewVideo(id))
    window.scrollTo(0, 0)
    return () => dispatch(clearCurrent())
  }, [id, dispatch])

  if (currentLoading) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '16/9', borderRadius: 2, mb: 2 }} />
        <Skeleton width="80%" height={32} />
        <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
      </Box>
    )
  }

  if (!video) return null

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        {/* Main content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Back button */}
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            size="small"
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            Back
          </Button>

          {/* Player */}
          <VideoPlayer src={video.videoUrl} poster={video.thumbnail} title={video.title} />

          {/* Title */}
          <Typography variant="h6" fontWeight={700} sx={{ mt: 2, lineHeight: 1.35 }}>
            {video.title}
          </Typography>

          {/* Meta row */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mt: 1.5, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">{formatViews(video.views)} views</Typography>
            </Box>
            <Typography variant="body2" color="text.disabled">·</Typography>
            <Typography variant="body2" color="text.secondary">{formatDate(video.publishedAt)}</Typography>
            <Box sx={{ flex: 1 }} />

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={isLiked ? 'contained' : 'outlined'}
                startIcon={isLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                size="small"
                onClick={() => dispatch(likeVideo(id))}
                sx={{ borderRadius: 6 }}
              >
                {formatViews(video.likes + (isLiked ? 0 : 0))}
              </Button>
              <Tooltip title={saved ? 'Saved' : 'Save'}>
                <IconButton size="small" onClick={() => setSaved(s => !s)}>
                  {saved ? <Bookmark color="primary" /> : <BookmarkBorder />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton size="small"><Share /></IconButton>
              </Tooltip>
              <IconButton size="small"><MoreHoriz /></IconButton>
            </Box>
          </Box>

          <Divider />

          {/* Author */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
            <Avatar src={video.author.avatar} sx={{ width: 48, height: 48 }} />
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={700}>{video.author.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {formatViews(video.author.subscribers)} subscribers
              </Typography>
            </Box>
            <Button variant="contained" size="small" sx={{ borderRadius: 6 }}>Subscribe</Button>
          </Box>

          <Divider />

          {/* Description */}
          <Box
            sx={{
              mt: 2, p: 2, borderRadius: 2, bgcolor: 'action.hover',
              cursor: 'pointer',
            }}
            onClick={() => setDescExpanded(e => !e)}
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <Chip label={video.category} size="small" color="primary" variant="outlined" />
              {video.tags.map(t => (
                <Chip key={t} label={`#${t}`} size="small" variant="outlined" sx={{ fontSize: 11 }} />
              ))}
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}
              className={descExpanded ? '' : 'line-clamp-3'}
            >
              {video.description}
            </Typography>
            <Typography variant="caption" color="primary.main" sx={{ mt: 0.5, display: 'block' }}>
              {descExpanded ? 'Show less' : 'Show more'}
            </Typography>
          </Box>
        </Box>

        {/* Sidebar: related videos */}
        <Box sx={{ width: { lg: 360 }, flexShrink: 0 }}>
          <RelatedVideos videos={related} loading={!related.length && currentLoading} />
        </Box>
      </Box>
    </Box>
  )
}
