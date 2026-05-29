import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, Typography, TextField, Button, Card, CardContent,
  Avatar, Chip, Divider, CircularProgress, IconButton, Tooltip,
  Tabs, Tab, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
} from '@mui/material'
import {
  CheckCircle, Cancel, Refresh, LockOutlined,
  ChatBubbleOutline, HourglassEmpty, People, MarkEmailRead, DeleteOutline, ForwardToInbox,
} from '@mui/icons-material'
import { adminApi, commentsApi } from '../services/api'

const SESSION_KEY = 'vstoryblog_admin_key'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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

// ── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setChecking(true)
    try {
      await adminApi.getPending(key.trim())
      sessionStorage.setItem(SESSION_KEY, key.trim())
      onLogin(key.trim())
    } catch (err) {
      setError(err.response?.status === 401 ? 'Incorrect admin key.' : 'Could not connect to server.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <Box sx={{
      minHeight: '70vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', px: 3,
    }}>
      <Box sx={{ width: '100%', maxWidth: 380 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <LockOutlined sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>Admin Panel</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Admin key"
            type="password"
            value={key}
            onChange={e => setKey(e.target.value)}
            fullWidth
            size="small"
            autoFocus
            disabled={checking}
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={checking || !key.trim()}
            endIcon={checking && <CircularProgress size={14} color="inherit" />}
            sx={{ borderRadius: 50, textTransform: 'none', fontWeight: 700 }}
          >
            {checking ? 'Verifying…' : 'Enter'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

// ── Pending Comments Panel ────────────────────────────────────────────────────

function CommentsPanel({ adminKey }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionId, setActionId] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.getPending(adminKey)
      .then(data => setComments(data.comments))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [adminKey])

  useEffect(() => { load() }, [load])

  const handleApprove = async (id) => {
    setActionId(id)
    try {
      await adminApi.approve(id, adminKey)
      setComments(prev => prev.filter(c => c.id !== id))
    } catch {
      // keep in list on failure
    } finally {
      setActionId(null)
    }
  }

  const handleReject = async (id) => {
    setComments(prev => prev.filter(c => c.id !== id))
    try {
      await adminApi.reject(id, adminKey)
    } catch {
      load()
    }
  }

  if (loading && comments.length === 0) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
  }

  if (comments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <HourglassEmpty sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">No comments pending approval.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {comments.map(c => {
        const busy = actionId === c.id
        return (
          <Card key={c.id} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent sx={{ pb: '12px !important' }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-block', mb: 1.5,
                  bgcolor: 'action.selected', px: 1, py: 0.3,
                  borderRadius: 1, fontWeight: 600,
                }}
              >
                {c.videoTitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <Avatar sx={{ width: 32, height: 32, flexShrink: 0, bgcolor: nameColor(c.name), fontSize: 13, fontWeight: 700 }}>
                  {nameInitial(c.name)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                    <Typography variant="caption" fontWeight={700}>{c.name}</Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: 10 }}>{timeAgo(c.createdAt)}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, wordBreak: 'break-word' }}>{c.text}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button
                  size="small" variant="outlined" color="error"
                  startIcon={busy ? <CircularProgress size={14} color="inherit" /> : <Cancel sx={{ fontSize: 16 }} />}
                  disabled={busy} onClick={() => handleReject(c.id)}
                  sx={{ borderRadius: 50, textTransform: 'none', fontSize: 12 }}
                >Reject</Button>
                <Button
                  size="small" variant="contained" color="success"
                  startIcon={busy ? <CircularProgress size={14} color="inherit" /> : <CheckCircle sx={{ fontSize: 16 }} />}
                  disabled={busy} onClick={() => handleApprove(c.id)}
                  sx={{ borderRadius: 50, textTransform: 'none', fontSize: 12 }}
                >Approve</Button>
              </Box>
            </CardContent>
          </Card>
        )
      })}
    </Box>
  )
}

// ── Subscribers Panel ─────────────────────────────────────────────────────────

function SubscribersPanel({ adminKey }) {
  const [data, setData] = useState({ subscribers: [], total: 0, verified: 0 })
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [resendingId, setResendingId] = useState(null)
  const [resentId, setResentId] = useState(null)   // shows brief confirmation

  const load = useCallback(() => {
    setLoading(true)
    adminApi.getSubscribers(adminKey)
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [adminKey])

  useEffect(() => { load() }, [load])

  const handleDelete = async (id) => {
    setData(prev => ({
      ...prev,
      subscribers: prev.subscribers.filter(s => s.id !== id),
      total: prev.total - 1,
      verified: prev.subscribers.find(s => s.id === id)?.verified ? prev.verified - 1 : prev.verified,
    }))
    try {
      await adminApi.deleteSubscriber(id, adminKey)
    } catch {
      load()   // restore list if server call failed
    } finally {
      setDeletingId(null)
    }
  }

  const handleResend = async (id) => {
    setResendingId(id)
    try {
      await adminApi.resendVerification(id, adminKey)
      setResentId(id)
      setTimeout(() => setResentId(null), 3000)
    } catch {
      // silently ignore — email service may be unavailable in dev
    } finally {
      setResendingId(null)
    }
  }

  if (loading && data.subscribers.length === 0) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
  }

  if (data.subscribers.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <People sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">No subscribers yet.</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Summary chips */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
        <Chip
          icon={<People sx={{ fontSize: 15 }} />}
          label={`${data.total} total`}
          size="small"
          sx={{ fontWeight: 600 }}
        />
        <Chip
          icon={<MarkEmailRead sx={{ fontSize: 15 }} />}
          label={`${data.verified} verified`}
          size="small"
          color="success"
          sx={{ fontWeight: 600 }}
        />
        {data.total - data.verified > 0 && (
          <Chip
            label={`${data.total - data.verified} pending`}
            size="small"
            color="warning"
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>

      {/* Table */}
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Subscribed</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Verified</TableCell>
              <TableCell sx={{ width: 40 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.subscribers.map(s => (
              <TableRow key={s.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 26, height: 26, bgcolor: nameColor(s.name), fontSize: 11, fontWeight: 700 }}>
                      {nameInitial(s.name)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600} fontSize={13}>{s.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontSize={12} color="text.secondary">{s.email}</Typography>
                </TableCell>
                <TableCell>
                  {s.verified
                    ? <Chip label="Verified" size="small" color="success" sx={{ height: 18, fontSize: 10, fontWeight: 700 }} />
                    : <Chip label="Pending" size="small" color="warning" sx={{ height: 18, fontSize: 10, fontWeight: 700 }} />
                  }
                </TableCell>
                <TableCell>
                  <Typography variant="caption" color="text.secondary">{timeAgo(s.subscribedAt)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" color="text.secondary">
                    {s.verifiedAt ? timeAgo(s.verifiedAt) : '—'}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ pr: 1, whiteSpace: 'nowrap' }}>
                  {!s.verified && (
                    <Tooltip title={resentId === s.id ? 'Email sent!' : 'Resend verification email'} arrow>
                      <IconButton
                        size="small"
                        onClick={() => handleResend(s.id)}
                        disabled={resendingId === s.id}
                        sx={{
                          color: resentId === s.id ? 'success.main' : 'text.disabled',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {resendingId === s.id
                          ? <CircularProgress size={14} />
                          : <ForwardToInbox sx={{ fontSize: 17 }} />}
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete subscriber" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(s.id)}
                      disabled={deletingId === s.id}
                      sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}
                    >
                      {deletingId === s.id
                        ? <CircularProgress size={14} />
                        : <DeleteOutline sx={{ fontSize: 17 }} />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

// ── Comment History Panel ─────────────────────────────────────────────────────

function HistoryPanel({ adminKey }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    commentsApi.getAll()
      .then(data => setComments(data.comments))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (id) => {
    setComments(prev => prev.filter(c => c.id !== id))
    try {
      await adminApi.reject(id, adminKey)
    } catch {
      load()
    }
  }

  if (loading && comments.length === 0) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>
  }

  if (comments.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <ChatBubbleOutline sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
        <Typography color="text.secondary">No approved comments yet.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
        {comments.length} approved {comments.length === 1 ? 'comment' : 'comments'}
      </Typography>
      {comments.map(c => (
        <Card key={c.id} variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ pb: '12px !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
              {/* Left: content badge + comment body */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'inline-block', mb: 1.5,
                    bgcolor: 'action.selected', px: 1, py: 0.3,
                    borderRadius: 1, fontWeight: 600,
                  }}
                >
                  {c.videoTitle}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Avatar sx={{ width: 32, height: 32, flexShrink: 0, bgcolor: nameColor(c.name), fontSize: 13, fontWeight: 700 }}>
                    {nameInitial(c.name)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={700}>{c.name}</Typography>
                      <Typography variant="caption" color="text.disabled" sx={{ fontSize: 10 }}>{timeAgo(c.createdAt)}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ lineHeight: 1.6, wordBreak: 'break-word' }}>{c.text}</Typography>
                  </Box>
                </Box>
              </Box>
              {/* Right: delete button */}
              <Tooltip title="Delete comment" arrow>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(c.id)}
                  sx={{ flexShrink: 0, color: 'text.disabled', '&:hover': { color: 'error.main' } }}
                >
                  <DeleteOutline sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

// ── Dashboard (tabs) ──────────────────────────────────────────────────────────

function Dashboard({ adminKey, onLogout }) {
  const [tab, setTab] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => setRefreshKey(k => k + 1)

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', px: { xs: 2, md: 3 }, py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>Admin Panel</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh" arrow>
            <IconButton size="small" onClick={handleRefresh}>
              <Refresh fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button
            size="small" variant="outlined" onClick={onLogout}
            sx={{ borderRadius: 50, textTransform: 'none', fontSize: 12 }}
          >
            Sign out
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab
          icon={<ChatBubbleOutline sx={{ fontSize: 17 }} />}
          iconPosition="start"
          label="Pending Comments"
          sx={{ textTransform: 'none', fontWeight: 600, fontSize: 13, minHeight: 44 }}
        />
        <Tab
          icon={<People sx={{ fontSize: 17 }} />}
          iconPosition="start"
          label="Subscribers"
          sx={{ textTransform: 'none', fontWeight: 600, fontSize: 13, minHeight: 44 }}
        />
        <Tab
          icon={<DeleteOutline sx={{ fontSize: 17 }} />}
          iconPosition="start"
          label="Comment History"
          sx={{ textTransform: 'none', fontWeight: 600, fontSize: 13, minHeight: 44 }}
        />
      </Tabs>

      {/* Panel content — key prop forces re-mount on refresh */}
      {tab === 0 && <CommentsPanel key={`comments-${refreshKey}`} adminKey={adminKey} />}
      {tab === 1 && <SubscribersPanel key={`subscribers-${refreshKey}`} adminKey={adminKey} />}
      {tab === 2 && <HistoryPanel key={`history-${refreshKey}`} adminKey={adminKey} />}
    </Box>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(SESSION_KEY) || '')

  const handleLogin = (key) => setAdminKey(key)
  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAdminKey('')
  }

  if (!adminKey) return <LoginScreen onLogin={handleLogin} />
  return <Dashboard adminKey={adminKey} onLogout={handleLogout} />
}
