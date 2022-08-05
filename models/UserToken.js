const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = require('./User');

const UserToken = sequelize.define('user_token',
    {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            userId: {type: DataTypes.INTEGER},
            token: {type: DataTypes.STRING}
    });

UserToken.belongsTo(User);

module.exports = UserToken;