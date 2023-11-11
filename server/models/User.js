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
        // enforces snake case
        underscored: true,
        modelName: 'User',
    }
)

module.exports = { User }






