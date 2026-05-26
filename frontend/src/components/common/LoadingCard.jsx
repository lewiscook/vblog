import React from 'react'
import { Card, CardContent, Skeleton, Box } from '@mui/material'

export function VideoCardSkeleton() {
  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <Skeleton variant="rectangular" height={180} />
      <CardContent sx={{ pt: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="90%" height={16} />
            <Skeleton variant="text" width="60%" height={14} sx={{ mt: 0.5 }} />
            <Skeleton variant="text" width="40%" height={12} sx={{ mt: 0.5 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export function GridSkeleton({ count = 12 }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => <VideoCardSkeleton key={i} />)}
    </Box>
  )
}
