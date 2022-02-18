const express = require("express");
const router = express.Router();
const Movie = require("../schemas/movie");
const User = require("../schemas/user");
const Comment = require("../schemas/comment");
const authMiddleware = require("../middlewares/auth-middleware");
const jwt = require("jsonwebtoken");

/* 댓글 불러오기 */

router.get("/comments", async (req, res) => {
    res.send("댓글 라우터");
});



module.exports = router;
