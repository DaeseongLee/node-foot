const express = require('express');

const { User, Room } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const where = {};
        const rooms = await Room.findAll({
            attributes: ['id', 'date', 'place', 'startTime', 'endTime'],
            where,
            order: [
                ['startTime', 'DESC'],
                ['createdAt', 'DESC']
            ],
        });
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const { place, date, startTime, endTime, number, notion } = req.body;
        //방생성
        await Room.create({
            place,
            date,
            startTime,
            endTime,
            number,
            notice: notion,
            roomMaker: req.user.id,
        });

        //생성하고 바로 조회
        const where = {};
        const rooms = await Room.findAll({
            where,
            order: [
                ['startTime', 'DESC'],
                ['createdAt', 'DESC']
            ],
        });

        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;