const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            introduce: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            imagePath: {
                type: Sequelize.STRING(80),
                allowNull: true,
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }

    static associate(db) {
        db.User.hasMany(db.Room, { foreignKey: 'roomMaker', sourceKey: 'id' });
        db.User.belongsToMany(db.Room, { through: 'Participant' });
    }
}