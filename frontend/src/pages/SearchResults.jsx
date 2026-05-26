import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Chip, CircularProgress } from '@mui/material'
import { Search } from '@mui/icons-material'
import { searchVideos } from '../store/slices/videosSlice'
import VideoGrid from '../components/video/VideoGrid'
import EmptyState from '../components/common/EmptyState'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const q = searchParams.get('q') || ''
  const { searchResults, searchQuery, searchLoading } = useSelector(s => s.videos)

  useEffect(() => {
    if (q) dispatch(searchVideos({ q }))
  }, [q, dispatch])

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Search sx={{ color: 'text.secondary' }} />
        <Typography variant="h6" fontWeight={700}>
          Search results for <Box component="span" sx={{ color: 'primary.main' }}>"{q}"</Box>
        </Typography>
        {!searchLoading && (
          <Chip label={`${searchResults.length} found`} size="small" variant="outlined" />
        )}
      </Box>

      {searchLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <VideoGrid
          videos={searchResults}
          loading={false}
          emptyTitle={`No results for "${q}"`}
          emptyMessage="Try different keywords or browse categories."
        />
      )}
    </Box>
  )
}
