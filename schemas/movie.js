const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({})

module.exports = mongoose.model('Movie', movieSchema, 'movies') //  아직 데이터 없지만 movies라는 collection에 데이터가 있다고 가정
