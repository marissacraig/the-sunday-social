const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt')

class User extends Model {
    // login verification
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }

    // search
    getLowerCaseName() {
        return this.username.toLowerCase();
    }
};

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
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8] }
        },
        school: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 30]}
        },
        work: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 30]}
        },
        currentlyLearning: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 20]}
        },
        headline: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 100]}
        },
        petPeeve: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 28]}
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hobbies: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: [1, 30]}
        }
    },
    // OPTIONS / CONFIG
    {
        hooks: {
            beforeCreate: async(newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async(updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        // doesn't plurarlize table name
        freezeTableName: true,
        modelName: 'User',
    }
)

module.exports = { User }






