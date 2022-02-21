const express = require('express')
const router = express.Router()

// Schemas
const Movie = require('../schemas/movie')
const Comment = require('../schemas/comment')
const User = require('../schemas/user')
const Star = require('../schemas/star')

// MiddleWares
const authMiddleware = require('../middlewares/auth-middleware')

// 메인 페이지 영화 조회
router.get('/movies', async (req, res) => {
    const movies = await Movie.find({}).select(
        'movieId title posterUrl year country category'
    )
    res.json({ movies })
})

// 영화 상세 정보 조회
router.get('/movies/:movieId/details', async (req, res) => {
    const { movieId } = req.params
    const movieInfo = await Movie.findOne({ movieId })
    res.json({ movieInfo })
})

// 별점 추가
router.post('/movies/:movieId/stars', authMiddleware, async (req, res) => {
    const { movieId } = req.params
    const { stars } = req.body
    const { userId } = res.locals.user

    // 이미 별점이 존재하면 수정
    const existStar = await Star.findOne({ userId, movieId })
    if (existStar) {
        existStar.stars = stars
        await existStar.save()
        return res.send()
    }

    const star = new Star({ userId, movieId, stars })
    await star.save()

    res.send()
})

// 별점 삭제
router.delete('/movies/:movieId/stars', authMiddleware, async (req, res) => {
    const { movieId } = req.params
    const { userId } = res.locals.user

    const existStar = await Star.findOne({ userId, movieId })
    if (!existStar) {
        return res.status(400).send()
    }

    await Star.deleteOne({ movieId, userId })

    res.send()
})

// 별점 정보 조회
router.get('/movies/:movieId/stars', async (req, res) => {
    const { movieId } = req.params

    const allStars = await Star.find({ movieId })
    if (!allStars.length) {
        const averageStar = 0
        const numRatings = 0
        const countsPerStars = [0, 0, 0, 0, 0]
        return res.json({ averageStar, numRatings, countsPerStars })
    }

    const numRatings = allStars.length
    const stars = allStars.map((x) => x.stars)
    const averageStar = stars.reduce((a, b) => a + b) / numRatings

    const countsPerStars = []
    for (let i = 1; i <= 5; i++) {
        countsPerStars.push(stars.filter((x) => x === i).length)
    }

    res.json({ averageStar, numRatings, countsPerStars })
})

module.exports = router
