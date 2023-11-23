const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        postText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        // doesn't plurarlize table name
        freezeTableName: true,
        modelName: 'Post',   
    }
)

module.exports = { Post }


