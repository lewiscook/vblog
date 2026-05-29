import React, { useState } from 'react'
import { Card, CardContent, Avatar, Typography, Box, IconButton, Tooltip } from '@mui/material'
import { PlayArrow, Visibility, Favorite, FavoriteBorder, Share, ChatBubbleOutline } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeVideo } from '../../store/slices/videosSlice'
import CommentsModal from '../common/CommentsModal'

function formatCount(n) {
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
  const dispatch = useDispatch()
  const likedIds = useSelector(s => s.videos.likedIds)

  const isStory = video.type === 'story'
  const liked = likedIds.includes(video.id)
  const [copiedTip, setCopiedTip] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)

  const handleLike = (e) => {
    e.stopPropagation()
    dispatch(likeVideo(video.id))
  }

  const handleShare = async (e) => {
    e.stopPropagation()
    const path = isStory ? `/story/${video.id}` : `/video/${video.id}`
    const url = `${window.location.origin}${path}`
    const shareData = { title: video.title, text: video.description || '', url }

    if (navigator.share && navigator.canShare?.(shareData) !== false) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if (err.name === 'AbortError') return   // user dismissed — do nothing
        // real failure: fall back to clipboard
        await navigator.clipboard.writeText(url)
        setCopiedTip(true)
        setTimeout(() => setCopiedTip(false), 2000)
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopiedTip(true)
      setTimeout(() => setCopiedTip(false), 2000)
    }
  }

  return (
    <Card
      onClick={() => navigate(isStory ? `/story/${video.id}` : `/video/${video.id}`)}
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
            {isStory
              ? <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>READ</span>
              : <PlayArrow sx={{ color: '#fff', fontSize: 24, ml: 0.5 }} />}
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
            onClick={e => e.stopPropagation()}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Visibility sx={{ fontSize: 12, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">
                  {formatCount(video.views)} · {timeAgo(video.publishedAt)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <IconButton
                  size="small"
                  onClick={handleLike}
                  sx={{ p: 0.4, color: liked ? 'error.main' : 'text.disabled', '&:hover': { color: 'error.main' } }}
                >
                  {liked
                    ? <Favorite sx={{ fontSize: 15 }} />
                    : <FavoriteBorder sx={{ fontSize: 15 }} />}
                </IconButton>
                {video.likes > 0 && (
                  <Typography variant="caption" color={liked ? 'error.main' : 'text.disabled'} sx={{ fontSize: 11 }}>
                    {formatCount(video.likes)}
                  </Typography>
                )}
                <Tooltip
                  title={copiedTip ? 'Link copied!' : 'Share'}
                  placement="top"
                  open={copiedTip || undefined}
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={handleShare}
                    sx={{ p: 0.4, color: 'text.disabled', '&:hover': { color: 'primary.main' } }}
                  >
                    <Share sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Comments" placement="top" arrow>
                  <IconButton
                    size="small"
                    onClick={e => { e.stopPropagation(); setCommentsOpen(true) }}
                    sx={{ p: 0.4, color: 'text.disabled', '&:hover': { color: 'primary.main' } }}
                  >
                    <ChatBubbleOutline sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>

      <CommentsModal
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        videoId={video.id}
        title={video.title}
      />
    </Card>
  )
}
