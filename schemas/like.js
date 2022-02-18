const mongoose = require("mongoose");
const moment = require("moment");

const likeSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    commentId:{
        type:String,
        require:true,
    },
})

// commentSchema.virtual("commentId").get(function () {
//     return this._id.toHexString();
// });
// commentSchema.set("toJSON", {
//     virtuals: true,
// });

module.exports = mongoose.model("like", likeSchema)