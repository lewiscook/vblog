import { Router } from 'express'
import { randomBytes } from 'crypto'
import { sendVerificationEmail } from '../mailer.js'

const router = Router()

// In-memory store (persists while server is running)
const subscribers = []

// Admin auth middleware
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.adminKey
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }
  next()
}

// GET /api/subscribers/admin/list — full subscriber list (admin only)
router.get('/admin/list', adminAuth, (req, res) => {
  const list = subscribers
    .map(({ token, expiresAt, ...safe }) => safe)   // strip sensitive fields
    .sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt))
  res.json({ subscribers: list, total: list.length, verified: list.filter(s => s.verified).length })
})

// POST /api/subscribers/admin/:id/resend — resend verification email (admin only)
router.post('/admin/:id/resend', adminAuth, async (req, res) => {
  const subscriber = subscribers.find(s => s.id === req.params.id)
  if (!subscriber) return res.status(404).json({ error: 'Subscriber not found.' })
  if (subscriber.verified) return res.status(400).json({ error: 'Subscriber is already verified.' })

  subscriber.token = randomBytes(32).toString('hex')
  subscriber.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  try {
    await sendVerificationEmail(subscriber.name, subscriber.email, subscriber.token)
    console.log(`Verification email resent to ${subscriber.email}`)
    res.json({ message: `Verification email resent to ${subscriber.email}.` })
  } catch (err) {
    console.error('Failed to resend verification email:', err.message)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

// DELETE /api/subscribers/admin/:id — remove a subscriber (admin only)
router.delete('/admin/:id', adminAuth, (req, res) => {
  const idx = subscribers.findIndex(s => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Subscriber not found.' })
  const [removed] = subscribers.splice(idx, 1)
  console.log(`Subscriber removed: ${removed.name} <${removed.email}>`)
  res.json({ message: 'Subscriber removed.' })
})

// POST /api/subscribers — register, send verification email
router.post('/', async (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  const normalised = email.trim().toLowerCase()
  const existing = subscribers.find(s => s.email === normalised)

  if (existing?.verified) {
    return res.status(409).json({ error: 'This email is already subscribed.' })
  }

  // Remove any unverified pending entry and re-send
  const idx = subscribers.findIndex(s => s.email === normalised)
  if (idx !== -1) subscribers.splice(idx, 1)

  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h

  const subscriber = {
    id: Date.now().toString(),
    name: name.trim(),
    email: normalised,
    verified: false,
    token,
    expiresAt,
    subscribedAt: new Date().toISOString(),
  }

  subscribers.push(subscriber)

  try {
    await sendVerificationEmail(subscriber.name, subscriber.email, token)
    console.log(`Verification email sent to ${subscriber.email}`)
  } catch (err) {
    console.error('Failed to send verification email:', err.message)
    // Still respond OK — the entry is saved, user can be told to check server logs
  }

  res.status(201).json({
    message: `A verification email has been sent to ${subscriber.email}. Please check your inbox to confirm your subscription.`,
  })
})

// GET /api/subscribers/verify/:token — confirm subscription
router.get('/verify/:token', (req, res) => {
  const { token } = req.params
  const subscriber = subscribers.find(s => s.token === token)

  if (!subscriber) {
    return res.status(404).json({ error: 'Invalid or expired verification link.' })
  }

  if (new Date() > new Date(subscriber.expiresAt)) {
    subscribers.splice(subscribers.indexOf(subscriber), 1)
    return res.status(410).json({ error: 'This verification link has expired. Please subscribe again.' })
  }

  if (subscriber.verified) {
    return res.json({ message: 'Your email is already verified. Welcome back!' })
  }

  subscriber.verified = true
  subscriber.verifiedAt = new Date().toISOString()
  delete subscriber.token
  delete subscriber.expiresAt

  console.log(`Subscriber verified: ${subscriber.name} <${subscriber.email}>`)
  res.json({ message: `Welcome, ${subscriber.name}! Your subscription is confirmed.`, name: subscriber.name })
})

// GET /api/subscribers/count — public count of verified subscribers
router.get('/count', (req, res) => {
  res.json({ count: subscribers.filter(s => s.verified).length })
})

export default router
