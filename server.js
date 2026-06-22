import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ideaRouter from './routes/ideaRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json()) //middlewhere to accept raw json in req in body
app.use(express.urlencoded({extended: true})) //urlencoded form data


//ROUTES
app.use('/api/ideas', ideaRouter)

//404 Fallback
app.use((req, res,next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)

    res.status(404)
    next(error)
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})