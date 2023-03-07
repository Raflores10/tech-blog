const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      comment_body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "posts",
            key: "id"
        }
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
  }},
    {
        sequelize,
        timestamps: false,
        modelName: 'comment'
    });

module.exports = Comment;
