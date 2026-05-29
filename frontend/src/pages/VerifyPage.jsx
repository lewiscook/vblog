import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material'
import axios from 'axios'

export default function VerifyPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [status, setStatus] = useState('loading') // loading | success | error
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token found.')
      return
    }

    axios.get(`/api/subscribers/verify/${token}`)
      .then(res => {
        setStatus('success')
        setMessage(res.data.message)
        setName(res.data.name || '')
      })
      .catch(err => {
        setStatus('error')
        setMessage(err.response?.data?.error || 'Verification failed. Please try again.')
      })
  }, [token])

  return (
    <Box sx={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: 3,
      gap: 2,
    }}>
      {status === 'loading' && (
        <>
          <CircularProgress size={52} />
          <Typography variant="body1" color="text.secondary">Verifying your subscription…</Typography>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircleOutline sx={{ fontSize: 64, color: 'success.main' }} />
          <Typography variant="h5" fontWeight={700}>
            {name ? `Welcome, ${name}!` : 'Subscription confirmed!'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
            {message}
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 1, borderRadius: 50, px: 4 }}>
            Go to VStoryBlog
          </Button>
        </>
      )}

      {status === 'error' && (
        <>
          <ErrorOutline sx={{ fontSize: 64, color: 'error.main' }} />
          <Typography variant="h5" fontWeight={700}>Verification failed</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
            {message}
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 1, borderRadius: 50, px: 4 }}>
            Back to Home
          </Button>
        </>
      )}
    </Box>
  )
}
