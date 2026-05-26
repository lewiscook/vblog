import { Router } from 'express'
import { categories, videos } from '../data/mockData.js'

const router = Router()

router.get('/', (req, res) => {
  const withCounts = categories.map(cat => ({
    ...cat,
    videoCount: videos.filter(v => v.category === cat.slug).length,
  }))
  res.json(withCounts)
})

router.get('/:slug', (req, res) => {
  const category = categories.find(c => c.slug === req.params.slug)
  if (!category) return res.status(404).json({ error: 'Category not found' })
  const categoryVideos = videos.filter(v => v.category === req.params.slug)
  res.json({ ...category, videos: categoryVideos })
})

export default router
