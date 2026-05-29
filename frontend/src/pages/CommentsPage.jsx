import React, { useEffect, useState } from 'react'
import {
  Box, Typography, Grid, Card, CardContent,
  Avatar, Chip, CircularProgress,
} from '@mui/material'
import { ChatBubbleOutline } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { commentsApi } from '../services/api'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

function nameInitial(name) {
  return name ? name.charAt(0).toUpperCase() : '?'
}

function nameColor(name) {
  const colors = ['#c8a84b', '#a07830', '#7c5c38', '#cd853f', '#8b6914', '#b8860b']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function CommentCard({ comment }) {
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the content the comment belongs to
    const isStory = comment.videoId && Number(comment.videoId) >= 17
    navigate(isStory ? `/story/${comment.videoId}` : `/video/${comment.videoId}`)
  }

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Source content badge */}
        <Chip
          label={comment.videoTitle}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            height: 20,
            fontSize: 10,
            fontWeight: 700,
            bgcolor: 'action.selected',
            letterSpacing: 0.3,
          }}
        />

        {/* Comment text */}
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            lineHeight: 1.7,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            color: 'text.primary',
            fontStyle: 'italic',
          }}
        >
          "{comment.text}"
        </Typography>

        {/* Footer: commenter + time */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Avatar
            sx={{
              width: 28, height: 28,
              bgcolor: nameColor(comment.name),
              fontSize: 12, fontWeight: 700,
            }}
          >
            {nameInitial(comment.name)}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="caption" fontWeight={700} display="block" noWrap>
              {comment.name}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0, fontSize: 10 }}>
            {timeAgo(comment.createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function CommentsPage() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    commentsApi.getAll()
      .then(data => setComments(data.comments))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
      {/* Page header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <ChatBubbleOutline sx={{ color: 'primary.main', fontSize: 26 }} />
        <Box>
          <Typography variant="h6" fontWeight={700}>Comments</Typography>
          {!loading && (
            <Typography variant="caption" color="text.secondary">
              {comments.length} approved {comments.length === 1 ? 'comment' : 'comments'}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty state */}
      {!loading && comments.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <ChatBubbleOutline sx={{ fontSize: 56, color: 'text.disabled', mb: 1.5 }} />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            No comments yet
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>
            Approved comments will appear here.
          </Typography>
        </Box>
      )}

      {/* Cards grid */}
      {!loading && comments.length > 0 && (
        <Grid container spacing={2}>
          {comments.map(comment => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={comment.id}>
              <CommentCard comment={comment} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
