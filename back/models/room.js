const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            place: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            startTime: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            endTime: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            number: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            notice: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'Room',
            tableName: 'rooms',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })

    }

    static associate(db) {
        db.Room.belongsTo(db.User, { foreignKey: 'roomMaker', targetKey: 'id' });
        db.Room.belongsToMany(db.User, { through: 'Participant', as: 'Joiner', foreignKey: 'GameRoom' }); //room.addJoiner
    }
}