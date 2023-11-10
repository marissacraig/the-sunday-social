const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {};

User.init(
    // data fields
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8] }
        }
    },
    // OPTIONS / CONFIG
    {
        sequelize,
        modelName: 'User',
        // doesn't plurarlize table name
        freezeTableName: true,
    }
)

module.exports = { User }






