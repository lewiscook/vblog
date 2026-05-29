import { Router } from 'express'

const router = Router()

// In-memory store (persists while server is running)
const comments = []

// Admin auth middleware
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.adminKey
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }
  next()
}

// ── Admin routes (must be declared BEFORE /:videoId to avoid param collision) ──

// GET /api/comments/admin/pending — all awaiting approval
router.get('/admin/pending', adminAuth, (req, res) => {
  const pending = comments
    .filter(c => !c.approved)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  res.json({ comments: pending, count: pending.length })
})

// POST /api/comments/admin/:id/approve — approve a comment
router.post('/admin/:id/approve', adminAuth, (req, res) => {
  const comment = comments.find(c => c.id === req.params.id)
  if (!comment) return res.status(404).json({ error: 'Comment not found.' })
  comment.approved = true
  comment.approvedAt = new Date().toISOString()
  console.log(`Comment approved: [${comment.videoId}] by ${comment.name}`)
  res.json(comment)
})

// DELETE /api/comments/admin/:id — reject / delete a comment
router.delete('/admin/:id', adminAuth, (req, res) => {
  const idx = comments.findIndex(c => c.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Comment not found.' })
  const [removed] = comments.splice(idx, 1)
  console.log(`Comment rejected: [${removed.videoId}] by ${removed.name}`)
  res.json({ message: 'Comment removed.' })
})

// ── Public routes ──

// GET /api/comments — all approved comments across all content
router.get('/', (req, res) => {
  const result = comments
    .filter(c => c.approved)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json({ comments: result, count: result.length })
})

// GET /api/comments/:videoId — only approved comments for one piece of content
router.get('/:videoId', (req, res) => {
  const result = comments
    .filter(c => c.videoId === req.params.videoId && c.approved)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json({ comments: result, count: result.length })
})

// POST /api/comments/:videoId — submit a comment (starts as pending)
router.post('/:videoId', (req, res) => {
  const { name, text, videoTitle } = req.body

  if (!name || !text) {
    return res.status(400).json({ error: 'Name and comment text are required.' })
  }
  if (text.trim().length < 2) {
    return res.status(400).json({ error: 'Comment is too short.' })
  }
  if (text.trim().length > 1000) {
    return res.status(400).json({ error: 'Comment must be 1000 characters or fewer.' })
  }

  const comment = {
    id: Date.now().toString(),
    videoId: req.params.videoId,
    videoTitle: videoTitle?.trim() || req.params.videoId,
    name: name.trim(),
    text: text.trim(),
    approved: false,
    createdAt: new Date().toISOString(),
  }

  comments.push(comment)
  console.log(`New comment pending approval on "${comment.videoTitle}" by ${comment.name}`)
  res.status(201).json({ message: 'Your comment has been submitted and is awaiting approval.' })
})

export default router
