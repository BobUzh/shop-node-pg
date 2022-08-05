const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const UserToken = require('./UserToken');

const User = sequelize.define('users',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, unique: true, required: true},
        password: {type: DataTypes.STRING, required: true},
        role: {type: DataTypes.STRING, defaultValue: 'USER'},
        username: {type: DataTypes.STRING, required: true},
        firstName: {type: DataTypes.STRING, required: true},
        lastName: {type: DataTypes.STRING, required: true},
        activationLink: {type: DataTypes.STRING},
        isActivated: {type: DataTypes.STRING}
    },{
        getterMethods: {
                dto() {
                        return {id:this.id, email:this.email, username:this.username};
                }
        }
    });

User.hasOne(UserToken);

module.exports = User;