const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { User, Room } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
    fs.readdirSync('userUploads')
} catch (error) {
    console.error(error);
    fs.mkdirSync('userUploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'userUploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

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
});

router.post('/logout', isLoggedIn, async (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

router.post('/uploadImage', isLoggedIn, upload.single('image'), async (req, res, next) => {


    res.json(`${req.file.filename}`);

});

router.patch('/upload', isLoggedIn, async (req, res) => {
    try {
        const { email, name, password, phone, introduce, imagePath } = req.body;
        let updateObject = {}
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            updateObject = {
                name,
                password: hashedPassword,
                phone,
                introduce,
                imagePath
            }
        } else {
            updateObject = {
                name,
                phone,
                introduce,
                imagePath
            }
        }
        await User.update(updateObject, {
            where: { id: req.user.id },
        })
        res.status(200).json({ email, name, phone, introduce });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;