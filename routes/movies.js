const express = require('express')
const router = express.Router()

// Schemas
const Movie = require('../schemas/movie')
const Comment = require('../schemas/comment')
const User = require('../schemas/user')

// MiddleWares
const authMiddleware = require('../middlewares/auth-middleware')

router.get('/movie', async (req, res) => {
    res.send('무비라우터')
})

module.exports = router
