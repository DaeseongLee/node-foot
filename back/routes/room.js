const express = require('express');

const { User, Room } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const where = {};
        const rooms = Room.findAll({
            attributes: ['id', 'date', 'place', 'startTime', 'endTime'],
            where,
            order: [
                ['startTime', 'DESC'],
                ['createdAt', 'DESC']
            ],
        });
        console.log('Router rooms', rooms);
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;