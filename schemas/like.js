const mongoose = require('mongoose')
const moment = require('moment')

const likeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    commentId: {
        type: String,
        required: true,
    },
})

// commentSchema.virtual("commentId").get(function () {
//     return this._id.toHexString();
// });
// commentSchema.set("toJSON", {
//     virtuals: true,
// });

module.exports = mongoose.model('Like', likeSchema)
