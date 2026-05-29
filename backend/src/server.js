import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import videosRouter from './routes/videos.js'
import categoriesRouter from './routes/categories.js'
import searchRouter from './routes/search.js'
import subscribersRouter from './routes/subscribers.js'
import commentsRouter from './routes/comments.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/videos', videosRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/search', searchRouter)
app.use('/api/subscribers', subscribersRouter)
app.use('/api/comments', commentsRouter)

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => console.log(`VBlog API running on http://localhost:${PORT}`))
