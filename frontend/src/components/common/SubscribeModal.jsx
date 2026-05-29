import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, Box, CircularProgress,
} from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { subscribe, resetSubscription } from '../../store/slices/subscribersSlice'

export default function SubscribeModal({ open, onClose }) {
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector(s => s.subscribers)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        dispatch(resetSubscription())
        setName('')
        setEmail('')
      }, 300)
    }
  }, [open, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    dispatch(subscribe({ name: name.trim(), email: email.trim() }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        Subscribe to VStoryBlog
      </DialogTitle>

      <DialogContent>
        {success ? (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircleOutline sx={{ fontSize: 56, color: 'success.main', mb: 1 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              You're subscribed!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Thanks for joining. We'll keep you updated with new chapters and videos.
            </Typography>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Stay updated with new chapters, videos, and stories from VStoryBlog.
            </Typography>
            <TextField
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              size="small"
              required
              autoFocus
              disabled={loading}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              size="small"
              required
              disabled={loading}
              error={!!error}
              helperText={error || ''}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        {success ? (
          <Button onClick={onClose} variant="contained" fullWidth>
            Close
          </Button>
        ) : (
          <>
            <Button onClick={onClose} disabled={loading}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading || !name.trim() || !email.trim()}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}
