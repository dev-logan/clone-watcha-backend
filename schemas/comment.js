const mongoose = require("mongoose");
const moment = require("moment");

const commentSchema = new mongoose.Schema({
    // comment_id:{
    //     type:String,
    //     required:true,
    // },
    userId:{
        type:String,
        required:true,
    },
    movieId:{
        type:String,
        required:true,
    },
    content: {
        type: String,
        required: true
    },
    countLikes: {
        type: Number,
    },
},{timestamps: true})

commentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
});
commentSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Comment", commentSchema)