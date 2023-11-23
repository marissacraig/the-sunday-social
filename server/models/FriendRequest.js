const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');


class FriendRequest extends Model {};

FriendRequest.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        requesterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        requesteeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Post',
                key: 'id'
            }
        }
    }, 
    {
        sequelize,
        // doesn't plurarlize table name
        freezeTableName: true,
        modelName: 'FriendRequest',   
    }
)

module.exports = { FriendRequest }