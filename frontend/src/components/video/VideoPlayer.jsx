import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  Box, IconButton, Slider, Typography, Tooltip,
} from '@mui/material'
import {
  PlayArrow, Pause, VolumeUp, VolumeOff,
  Fullscreen, FullscreenExit, Replay10, Forward10,
} from '@mui/icons-material'

function fmtTime(s) {
  if (isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const hideTimer = useRef(null)

  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimer.current)
    setShowControls(true)
    hideTimer.current = setTimeout(() => setShowControls(false), 3000)
  }, [])

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) videoRef.current.pause()
    else videoRef.current.play()
    setPlaying(!playing)
  }

  const skip = (sec) => {
    if (videoRef.current) videoRef.current.currentTime += sec
  }

  const handleVolumeChange = (_, val) => {
    setVolume(val)
    if (videoRef.current) videoRef.current.volume = val
    setMuted(val === 0)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const next = !muted
    setMuted(next)
    videoRef.current.muted = next
  }

  const handleSeek = (_, val) => {
    if (videoRef.current) videoRef.current.currentTime = val
    setCurrentTime(val)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  return (
    <Box
      ref={containerRef}
      onMouseMove={scheduleHide}
      onClick={togglePlay}
      sx={{
        position: 'relative', bgcolor: '#000', borderRadius: 2, overflow: 'hidden',
        aspectRatio: '16/9', cursor: showControls ? 'default' : 'none',
        '&:fullscreen': { borderRadius: 0 },
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        onTimeUpdate={e => {
          setCurrentTime(e.target.currentTime)
          if (e.target.buffered.length) setBuffered(e.target.buffered.end(e.target.buffered.length - 1))
        }}
        onLoadedMetadata={e => setDuration(e.target.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {/* Controls overlay */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          p: 1.5, pt: 0,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress */}
        <Box sx={{ px: 1, mb: -0.5 }}>
          <Slider
            value={currentTime}
            min={0}
            max={duration || 1}
            onChange={handleSeek}
            size="small"
            sx={{
              color: 'primary.main', padding: '8px 0',
              '& .MuiSlider-thumb': { width: 12, height: 12, '&:hover': { boxShadow: '0 0 0 8px rgba(108,99,255,0.2)' } },
              '& .MuiSlider-rail': { bgcolor: 'rgba(255,255,255,0.3)' },
            }}
          />
        </Box>

        {/* Buttons row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" onClick={togglePlay} sx={{ color: '#fff' }}>
            {playing ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton size="small" onClick={() => skip(-10)} sx={{ color: '#fff' }}>
            <Replay10 fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => skip(10)} sx={{ color: '#fff' }}>
            <Forward10 fontSize="small" />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 0.5 }}>
            <IconButton size="small" onClick={toggleMute} sx={{ color: '#fff' }}>
              {muted || volume === 0 ? <VolumeOff fontSize="small" /> : <VolumeUp fontSize="small" />}
            </IconButton>
            <Slider
              value={muted ? 0 : volume}
              min={0} max={1} step={0.05}
              onChange={handleVolumeChange}
              size="small"
              sx={{ width: 70, color: '#fff', '& .MuiSlider-thumb': { width: 10, height: 10 } }}
            />
          </Box>

          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', mx: 1, fontVariantNumeric: 'tabular-nums' }}>
            {fmtTime(currentTime)} / {fmtTime(duration)}
          </Typography>

          <Box sx={{ flex: 1 }} />

          <Tooltip title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
            <IconButton size="small" onClick={toggleFullscreen} sx={{ color: '#fff' }}>
              {fullscreen ? <FullscreenExit fontSize="small" /> : <Fullscreen fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}
