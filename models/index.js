const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");

Post.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(Post)

Comment.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(Comment)

Comment.belongsTo(Post,{
    onDelete:"CASCADE"
})
Post.hasMany(Comment)

module.exports = {
    User,
    Post,
    Comment
}