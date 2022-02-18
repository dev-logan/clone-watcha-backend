const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const authMiddleware = require("../middlewares/auth-middleware");

const { JWT_SECRET_KEY } = process.env

router.get("/user", async (req, res) => {
    res.send("user라우터");
});


module.exports = router;
