// const sync = require(`./models/sync`)
// sync();

const express = require(`express`);
const morgan = require(`morgan`);
const dotenv = require(`dotenv`);
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const checkAuth = require(`./routes/authorization`);
const authRouter = require(`./routes/authRouter`);
const postRouter = require(`./routes/postRouter`);

app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/posts`, checkAuth);
app.use(`/member`, authRouter);
app.use(`/posts`, postRouter);

app.listen(port, () => {
    console.log(`PORT ${port}로 서버가 열렸습니다.`);
});