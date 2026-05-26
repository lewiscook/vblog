import { Router } from 'express'
import { videos } from '../data/mockData.js'

const router = Router()

router.get('/', (req, res) => {
  const { q = '', category } = req.query

  if (!q.trim()) return res.json({ results: [], query: q, total: 0 })

  const query = q.toLowerCase()
  let results = videos.filter(v =>
    v.title.toLowerCase().includes(query) ||
    v.description.toLowerCase().includes(query) ||
    v.tags.some(t => t.toLowerCase().includes(query)) ||
    v.author.name.toLowerCase().includes(query)
  )

  if (category && category !== 'all') {
    results = results.filter(v => v.category === category)
  }

  res.json({ results, query: q, total: results.length })
})

export default router
