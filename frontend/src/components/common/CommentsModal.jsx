import React, { useState, useEffect, useCallback } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, TextField, Button, Avatar,
  Divider, CircularProgress, IconButton, Chip,
} from '@mui/material'
import { Close, ChatBubbleOutline, Send } from '@mui/icons-material'
import { commentsApi } from '../../services/api'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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

export default function CommentsModal({ open, onClose, videoId, title }) {
  const [comments, setComments] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [posting, setPosting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const load = useCallback(() => {
    if (!videoId) return
    setLoading(true)
    commentsApi.getByVideoId(videoId)
      .then(data => { setComments(data.comments); setCount(data.count) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [videoId])

  useEffect(() => {
    if (open) load()
  }, [open, load])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (!text.trim()) { setError('Please write a comment.'); return }
    setPosting(true)
    try {
      await commentsApi.post(videoId, { name: name.trim(), text: text.trim(), videoTitle: title })
      setSubmitted(true)
      setName('')
      setText('')
    } catch (err) {
      setError(err.response?.data?.error || 'Could not post comment. Please try again.')
    } finally {
      setPosting(false)
    }
  }

  const handleClose = () => {
    setError('')
    setSubmitted(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      onClick={e => e.stopPropagation()}
      PaperProps={{ sx: { borderRadius: 3, bgcolor: 'background.paper' } }}
    >
      {/* Header */}
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ChatBubbleOutline sx={{ fontSize: 20, color: 'primary.main' }} />
          <Typography fontWeight={700} fontSize="1rem">Comments</Typography>
          {count > 0 && (
            <Chip label={count} size="small" sx={{ height: 20, fontSize: 11, bgcolor: 'action.selected' }} />
          )}
        </Box>
        <IconButton size="small" onClick={handleClose}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      {title && (
        <Box sx={{ px: 3, pb: 1 }}>
          <Typography variant="caption" color="text.secondary" noWrap>
            {title}
          </Typography>
        </Box>
      )}

      <Divider />

      <DialogContent sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Post form or confirmation */}
        {submitted ? (
          <Box sx={{ textAlign: 'center', py: 2, px: 1 }}>
            <Typography fontSize="2rem" mb={0.5}>🎉</Typography>
            <Typography fontWeight={700} mb={0.5}>Comment submitted!</Typography>
            <Typography variant="body2" color="text.secondary">
              Your comment is awaiting approval and will appear once reviewed.
            </Typography>
            <Button
              size="small"
              onClick={() => setSubmitted(false)}
              sx={{ mt: 2, borderRadius: 50, textTransform: 'none' }}
            >
              Write another
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <TextField
              label="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              size="small"
              fullWidth
              inputProps={{ maxLength: 60 }}
              disabled={posting}
            />
            <TextField
              label="Write a comment…"
              value={text}
              onChange={e => setText(e.target.value)}
              size="small"
              fullWidth
              multiline
              minRows={2}
              maxRows={5}
              inputProps={{ maxLength: 1000 }}
              disabled={posting}
            />
            {error && (
              <Typography variant="caption" color="error">{error}</Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                endIcon={posting ? <CircularProgress size={14} color="inherit" /> : <Send sx={{ fontSize: 15 }} />}
                disabled={posting}
                sx={{ borderRadius: 50, px: 3, textTransform: 'none', fontWeight: 600 }}
              >
                {posting ? 'Posting…' : 'Post'}
              </Button>
            </Box>
          </Box>
        )}

        <Divider />

        {/* Comments list */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={28} />
          </Box>
        ) : comments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <ChatBubbleOutline sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              No comments yet. Be the first!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {comments.map(c => (
              <Box key={c.id} sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 32, height: 32, flexShrink: 0,
                    bgcolor: nameColor(c.name),
                    fontSize: 14, fontWeight: 700,
                  }}
                >
                  {nameInitial(c.name)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="caption" fontWeight={700}>{c.name}</Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: 10 }}>
                      {timeAgo(c.createdAt)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 0.3, lineHeight: 1.6, wordBreak: 'break-word' }}>
                    {c.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} size="small" sx={{ borderRadius: 50, textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
