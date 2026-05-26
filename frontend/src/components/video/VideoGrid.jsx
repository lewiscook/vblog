import React from 'react'
import { Box } from '@mui/material'
import VideoCard from './VideoCard'
import { GridSkeleton } from '../common/LoadingCard'
import EmptyState from '../common/EmptyState'

export default function VideoGrid({ videos, loading, emptyTitle, emptyMessage }) {
  if (loading) return <GridSkeleton />

  if (!videos?.length) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
      className="animate-fade-in"
    >
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </Box>
  )
}
