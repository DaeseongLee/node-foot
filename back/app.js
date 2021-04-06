const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3065);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch(e => {
        console.error(e);
    });
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3075',
    credentials: true,
}));

app.use('/', express.static(path.join(__dirname, 'userUploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send("hello express");
});

app.use('/user', userRouter);
app.use('/room', roomRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log('서버 실행 중');
});