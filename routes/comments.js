const express = require("express");
const router = express.Router();
const Movie = require("../schemas/movie");
const User = require("../schemas/user");
const Comment = require("../schemas/comment");
const Like = require("../schemas/like");
const authMiddleware = require("../middlewares/auth-middleware");
const jwt = require("jsonwebtoken");

//전체 댓글 조회
router.get("/movies/:movieId/comments",async(req,res)=>{
    // authMiddelware 오면 밑에 주석 제거
    //const {userId} = res.locals.user
    const {movieId} = req.params
    const comments = await Comment.find({movieId}) 
    res.send(comments)
})

//내 댓글 조회
router.get("/movies/:movieId/comments/me",async(req,res)=>{
    // authMiddelware 오면 밑에 주석 제거
    //const {userId} = res.locals.user
    const {movieId} = req.params
    const {userId} = req.body  // authMiddleware 오면 주석처리하기 
    const comment = await Comment.findOne({movieId,userId})
    if(!comment){
        return res.json({message:"댓글이 없습니다."})
    }
    res.send(comment)
})






// 댓글 작성 기능 
router.post("/movies/:movieId/comments", async(req, res) => {
    // authMiddelware 오면 밑에 주석 제거
    //const {userId} = res.locals.user
    const {movieId} = req.params
    const {userId,content} = req.body // authMiddelware 오면 userId 제거
    const countLikes = 0
    if(!content){
        return res.status(400).json({errorMessage:"댓글을 입력하지 않았습니다."})
    }
    const existComment = await Comment.findOne({userId,movieId})
    if(existComment){
        return res.status(400).json({errorMessage:"이미 댓글을 작성하였습니다."})
    }
    await Comment.create({movieId, userId, content, countLikes})
    res.status(201).json({message:"댓글 작성이 완료되었습니다."})
});

// 댓글 수정 기능
router.patch("/comments/:commentId", async(req, res) => {
    // authMiddelware 오면 밑에 주석 제거
    //const {userId} = res.locals.user
    const {commentId} = req.params
    const {userId,content} = req.body // authMiddelware 오면 userId 제거
    if(!content){
        return res.status(400).json({errorMessage:"댓글을 입력하지 않았습니다."})
    } 
    const existComment = await Comment.findOne({_id:commentId})
    console.log(existComment)
    if(existComment.userId !== userId){
        return res.status(400).json({errorMessage:"자기 댓글만 삭제할 수 있습니다."})
    } else{
        await Comment.updateOne({_id: commentId }, { $set: { content } });    
    }
    res.status(201).json({message:"댓글 수정이 완료되었습니다."})
});

// 댓글 삭제 기능
router.delete("/comments/:commentId", async(req, res) => {
    // authMiddelware 오면 밑에 주석 제거
    //const {userId} = res.locals.user
    const {commentId} = req.params
    const {userId} = req.body // authMiddelware 오면 userId 제거
    const existComment = await Comment.findOne({_id:commentId})
    if(existComment){
        if(existComment.userId !== userId){
            return res.status(400).json({errorMessage:"자기 댓글만 삭제할 수 있습니다."})
        } else {
            await Comment.deleteOne({_id:commentId});  
        }
    }
    res.status(201).json({message:"댓글 삭제가 완료되었습니다."})
});

// 좋아요 추가 기능
router.post("/comments/:commentId/likes", async(req, res) => {
    //const {userId} = res.locals.user
    const {commentId} = req.params
    const {userId} = req.body // authMiddelware 오면 주석처리 해야함.
    const isLike = await Like.findOne({commentId,userId})
    if(isLike){
        return res.status(400).json({errorMessage:"이미 좋아요 되어있는 상태입니다."})
    } else{
        await Like.create({userId, commentId}) 
        const existLikes = await Like.find({commentId})
        const countLikes = existLikes.length  
        await Comment.updateOne({_id: commentId }, { $set: { countLikes } })
    }
    res.status(201).json({message:"좋아요 추가 되었습니다."})
});

// 좋아요 제거 기능
router.delete("/comments/:commentId/likes", async(req, res) => {
    //const {userId} = res.locals.user
    console.log('제거요청 들어옴')
    const {commentId} = req.params
    console.log(commentId)
    const {userId} = req.body // authMiddelware 오면 주석처리 해야함.
    console.log(userId)
    const isLike = await Like.findOne({commentId,userId})
    console.log(isLike)
    if(!isLike){
        return res.status(400).json({errorMessage:"이미 좋아요 되어있지 않은 상태입니다."})
    } else{
        await Like.deleteOne({userId, commentId}) 
        const existLikes = await Like.find({commentId})
        console.log(existLikes)
        const countLikes = existLikes.length  
        await Comment.updateOne({_id: commentId }, { $set: { countLikes } })
    }
    res.status(201).json({message:"좋아요 취소 되었습니다."})
});

router.get("/comments/:commentId/likes", async(req, res) => {
    const {commentId} = req.params
    console.log(commentId)
    const likeUsers = await Like.find({commentId})
    console.log(likeUsers)
    res.json({likeUsers})
});










module.exports = router;
