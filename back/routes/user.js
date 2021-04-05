const express = require('express');
const bcrypt = require('bcrypt');

const { User, Room } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => { //POST /user/ 
    try {
        console.log('req.body', req.body);
        const { email, name, password, phone } = req.body;
        const exUser = await User.findOne({
            where: {
                email
            }
        });
        console.log('exUser', exUser);
        if (exUser) return res.status(403).send('이미 존재하는 이메일입니다');
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            email,
            name,
            password: hashedPassword,
            phone
        });
        res.status(201).send('ok');
    } catch (e) {
        console.error(e);
        next(error);
    }
});


module.exports = router;