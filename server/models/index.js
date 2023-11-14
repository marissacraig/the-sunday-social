const { User } = require('./User');
const { Comment } = require('./Comment');
const { Post } = require('./Post');
const { Likes } = require('./Likes');

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Post.hasOne(User, {
    foreignKey: 'userId'
})

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'userId'
})

User.hasMany(Likes, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Likes.hasOne(User, {
    foreignKey: 'userId'
})


Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
})

Comment.hasOne(Post, {
    foreignKey: 'postId'
})

Post.hasMany(Likes, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
})

Likes.hasOne(Post, {
    foreignKey: 'postId'
})





module.exports = { User, Post, Comment, Likes }