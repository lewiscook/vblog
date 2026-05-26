import { Router } from 'express'
import { videos } from '../data/mockData.js'

const router = Router()

router.get('/', (req, res) => {
  const { category, page = 1, limit = 12, sort = 'newest' } = req.query
  let result = [...videos]

  if (category && category !== 'all') {
    result = result.filter(v => v.category === category)
  }

  if (sort === 'popular') result.sort((a, b) => b.views - a.views)
  else if (sort === 'liked') result.sort((a, b) => b.likes - a.likes)
  else result.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  const total = result.length
  const start = (Number(page) - 1) * Number(limit)
  const paginated = result.slice(start, start + Number(limit))

  res.json({
    videos: paginated,
    pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / limit) },
  })
})

router.get('/featured', (req, res) => {
  res.json(videos.filter(v => v.featured))
})

router.get('/:id', (req, res) => {
  const video = videos.find(v => v.id === req.params.id)
  if (!video) return res.status(404).json({ error: 'Video not found' })
  res.json(video)
})

router.get('/:id/related', (req, res) => {
  const video = videos.find(v => v.id === req.params.id)
  if (!video) return res.status(404).json({ error: 'Video not found' })
  const related = videos
    .filter(v => v.id !== video.id && (v.category === video.category || v.tags.some(t => video.tags.includes(t))))
    .slice(0, 8)
  res.json(related)
})

router.post('/:id/like', (req, res) => {
  const video = videos.find(v => v.id === req.params.id)
  if (!video) return res.status(404).json({ error: 'Video not found' })
  video.likes += 1
  res.json({ likes: video.likes })
})

export default router
