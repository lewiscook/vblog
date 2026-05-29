import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Breadcrumbs, Link } from '@mui/material'
import { ArrowBack, Home } from '@mui/icons-material'
import { fetchVideos } from '../store/slices/videosSlice'
import { setSelected } from '../store/slices/categoriesSlice'
import VideoGrid from '../components/video/VideoGrid'

export default function CategoryPage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading, pagination } = useSelector(s => s.videos)
  const categories = useSelector(s => s.categories.items)
  const category = categories.find(c => c.slug === slug)

  useEffect(() => {
    dispatch(setSelected(slug))
    dispatch(fetchVideos({ category: slug, sort: 'newest', page: 1, limit: 12 }))
  }, [slug, dispatch])

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Home sx={{ fontSize: 16 }} /> Home
        </Link>
        <Typography color="text.primary" fontWeight={600}>{category?.name || slug}</Typography>
      </Breadcrumbs>

      {category && (
        <Box
          sx={{
            p: 3, mb: 3, borderRadius: 3,
            background: `linear-gradient(135deg, ${category.color}22, ${category.color}08)`,
            border: '1px solid', borderColor: category.color + '33',
          }}
        >
          <Typography variant="h5" fontWeight={800} sx={{ color: category.color, mb: 0.5 }}>
            {category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pagination.total} {['chapters', 'capitulos'].includes(category.slug) ? 'readings in this category' : 'videos in this category'}
          </Typography>
        </Box>
      )}

      <VideoGrid
        videos={items}
        loading={loading}
        emptyTitle={`No ${category?.name || slug} videos yet`}
        emptyMessage="Check back later for new content in this category."
      />

      {!loading && pagination.page < pagination.totalPages && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" onClick={() => dispatch(fetchVideos({ category: slug, page: pagination.page + 1, limit: 12 }))} sx={{ px: 4 }}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  )
}
