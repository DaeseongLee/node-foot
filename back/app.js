const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3065);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch(e => {
        console.error(e);
    });
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("hello express");
})
app.listen(app.get('port'), () => {
    console.log('서버 실행 중');
});