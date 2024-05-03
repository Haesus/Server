const express = require(`express`);
const { User, Post } = require(`../models/`);
const router = express.Router();
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const secret = process.env.JWT_SECRET;

router.post(`/`, async (req, res) => {
    const newPost = req.body;
    newPost.userID = req.userID;
    try {
        const result = await Post.create(newPost);
        res.json({
            success: true,
            document: result,
            message: `호구의 post가 등록 성공했습니다.`
        });
    } catch(error) {
        res.json({
            success: false,
            document: [],
            message: `호구의 post가 등록 실패했습니다.`
        });
    };
});

router.get(`/`, async (req, res) => {
    const result = await Post.findAll();

    try {
        res.json({
            success: true,
            document: result,
            message: `호구가 post 조회에 성공했습니다.`
        });
    } catch(error) {
        res.json({
            success: false,
            document: [],
            message: `호구의 post가 조회에 실패했습니다.`
        });
    };
});

module.exports = router;