import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Divider, Select, MenuItem, FormControl } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchVideos } from '../store/slices/videosSlice'
import { setSelected } from '../store/slices/categoriesSlice'
import HeroSection from '../components/video/HeroSection'
import VideoGrid from '../components/video/VideoGrid'
import CategoryFilter from '../components/common/CategoryFilter'

export default function Home() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

  const { items, loading, pagination } = useSelector(s => s.videos)
  const selectedCategory = useSelector(s => s.categories.selected)

  useEffect(() => {
    dispatch(fetchVideos({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sort,
      page: 1,
      limit: 12,
    }))
  }, [dispatch, selectedCategory, sort])

  const handleCategoryChange = (slug) => {
    dispatch(setSelected(slug))
  }

  const loadMore = () => {
    dispatch(fetchVideos({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sort,
      page: pagination.page + 1,
      limit: 12,
    }))
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Hero */}
      <Box sx={{ mb: 3 }}>
        <HeroSection />
      </Box>

      {/* Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          {selectedCategory === 'all' ? 'All Videos' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({pagination.total} videos)
          </Typography>
        </Typography>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <Select value={sort} onChange={e => setSort(e.target.value)} sx={{ borderRadius: 2, fontSize: 13 }}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popular">Most Viewed</MenuItem>
            <MenuItem value="liked">Most Liked</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Category filter */}
      <Box sx={{ mb: 2.5 }}>
        <CategoryFilter onChange={handleCategoryChange} />
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* Video grid */}
      <VideoGrid
        videos={items}
        loading={loading}
        emptyTitle="No videos found"
        emptyMessage="Try selecting a different category or check back later."
      />

      {/* Load more */}
      {!loading && pagination.page < pagination.totalPages && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" onClick={loadMore} sx={{ px: 4, borderRadius: 2 }}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  )
}
