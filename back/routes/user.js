const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Room } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => { //POST /user/ 
    try {
        const { email, name, password, phone } = req.body;
        const exUser = await User.findOne({
            where: {
                email
            }
        });
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
        next(e);
    }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => { //POST /login
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            console.error('info', info);
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            try {
                const fullUserWithoutPassword = await User.findOne({
                    where: { id: user.id },
                    attributes: {
                        exclude: ['password']
                    }
                })
                return res.status(200).json(fullUserWithoutPassword);
            } catch (e) {
                console.error(e);
                next(e);
            }
        });
    })(req, res, next);
})

module.exports = router;