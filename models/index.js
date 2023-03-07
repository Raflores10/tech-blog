const User = require("./users");
const Post = require("./posts");
const Comment = require("./comments");

Post.belongsTo(User, {
    onDelete: "cascade",
    foreignKey: "users_id"
})

Comment.belongsTo(User, {
    onDelete: "cascade",
    foreignKey: "user_id"
})

User.hasMany(Post, {
    foreignKey: "user_id"
});

Comment.belongsTo(Post, {
    onDelete: "cascade",
    foreignKey: "posts_id"
})

User.hasMany(Comment, {
    onDelete: "cascade",
    foreignKey: "user_id"
})

Post.hasMany(Comment, {
    onDelete: "cascade",
    foreignKey: "posts_id"
})



module.exports = {
    User,
    Post,
    Comment
}
