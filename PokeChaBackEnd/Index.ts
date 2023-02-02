//DEPENDENCIES
require('dotenv').config()
import cors from 'cors'

import express from 'express';
let  mongoose = require('mongoose')
let  cardsRoutes = require('./routes/cards')
let  userRoutes = require('./routes/user')

// BUILD EXPRESS APP
let app = express()

// MIDDLEWARE
app.use(express.json())
app.use(cors())

app.use((req: any, res: any, next: () => void) => {
  next()
})

// ROUTES
app.use('/api/cards', cardsRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & listening on port', process.env.PORT)
    })
  })
  .catch((error: any) => {
    console.log(error)
  })

