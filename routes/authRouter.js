const express = require(`express`);
const { User } = require(`../models/`);
const router = express.Router();
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const secret = process.env.JWT_SECRET;

const createHash = async (password, saltRound) => {
    const hashed = await bcrypt.hash(password, saltRound);
    console.log(hashed);
    return hashed;
};

router.post(`/signUp`, async (req, res) => {
    const member = req.body;
    member.password = await createHash(member.password, 10);

    try {
        const result = await User.create(member);
        res.json({
            success: true,
            document: result,
            message: `신규 가입자 등록 완료. 오예 호구 한명 얻었당~`
        });
    } catch {
        res.json({
            success: false,
            document: [],
            message: `신규 가입자 등록 실패!!ㅠㅠ 빨리 호구 잡아라~${res}`
        });
    };
});

router.get(`/signIn`, async (req, res) => {
    const {userID, password} = req.body;
    const options = {
        attributes: [ `password` ],
        where: { userID: userID },
    };
    const result = await User.findOne(options);

    if (result) {
        const compared = await bcrypt.compare(password, result.password);

        if (compared) {
            const token = jwt.sign({
                id: userID,
                rol: `admin`,
            },
            secret
            );
            res.json({
                succes: true,
                token: token,
                document: [],
                message: `로그인에 성공했습니다. 호구여 환영합니다.`
            });
        } else {
            res.json({
                succes: false,
                document: [],
                message: `패스워드가 틀렸습니다. 호구여 빨리 비밀번호를 생각해보세요.`
            });
        };
    } else {
        res.json({
            succes: false,
            document: [],
            message: `존재하지 않는 아이디입니다. 호구여 가입하세요.`
        });
    };
});

module.exports = router;