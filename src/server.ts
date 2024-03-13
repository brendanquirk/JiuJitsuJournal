import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/UserRoutes'

dotenv.config()

//=====MONGODB ATLAS CONFIG=====//
const port = process.env.PORT
const uri = process.env.MONGODBURI as string

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error)
  })

//=====EXPRESS APPLICATION START=====//
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)

app.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/api/users')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
