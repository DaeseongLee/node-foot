const express = require('express');

const { User, Room } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const where = {};
        const rooms = await Room.findAll({
            attributes: ['id', 'date', 'place', 'startTime', 'endTime', 'number'],
            where,
            order: [
                ['startTime', 'DESC'],
                ['createdAt', 'DESC']
            ],
            include: [{
                model: User,
                as: 'Joiner',
            }]
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
        const roomOne = await Room.create({
            place,
            date,
            startTime,
            endTime,
            number,
            notice: notion,
            roomMaker: req.user.id,
        });
        await roomOne.addJoiner(req.user.id);

        //생성하고 바로 조회
        // const where = {};
        // const rooms = await Room.findAll({
        //     where,
        //     order: [
        //         ['startTime', 'DESC'],
        //         ['createdAt', 'DESC']
        //     ],
        // });
        // res.status(200).json(rooms);
        res.status(200).json({ RoomId: roomOne.id });

    } catch (error) {
        console.error(error);
        next(error);
    }
})


router.post('/roomDetail', isLoggedIn, async (req, res, next) => {
    try {
        //방생성
        const roomDetail = await Room.findOne({
            attributes: ['id', 'place', 'date', 'startTime', 'endTime', 'number', 'notice', 'roomMaker'],
            where: { id: req.body.id },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email', 'imagePath'],
                as: 'Joiner',
                order: [
                    ['createdAt', 'DESC']
                ]
            }]
        });
        res.status(200).json(roomDetail);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.post('/roomJoin', isLoggedIn, async (req, res, next) => {
    try {
        const { roomId, userId } = req.body;
        //방생성
        const room = await Room.findOne({
            where: { id: roomId },
        });
        const joiner = await room.getJoiner();
        if (joiner.findIndex(user => user.id === userId) === -1) {
            room.addJoiner(userId);
        }
        res.status(200).json({ RoomId: roomId });
    } catch (error) {
        console.error(error);
        next(error);
    }
})


router.post('/roomExit', isLoggedIn, async (req, res, next) => {
    try {
        const { roomId, userId } = req.body;
        //방생성
        const room = await Room.findOne({
            where: { id: roomId },
        });
        room.removeJoiner(userId);
        res.status(200).send('ok');
    } catch (error) {
        console.error(error);
        next(error);
    }
})



module.exports = router;
