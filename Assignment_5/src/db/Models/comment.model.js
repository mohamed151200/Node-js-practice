import { DataTypes } from "sequelize"
import { sequelize } from "../connections.js"
import { User } from "./user.model.js"
import { Post } from "./post.model.js"


export const Comment = sequelize.define(
    'Comment',
    {
        id: {
           autoIncrement:true,
           unique:true,
           allowNull:false,
           primaryKey:true,
           type:DataTypes.INTEGER
        },
        
        content:{
            type:DataTypes.TEXT,

        },
        

    },
    {
        timestamps: true,
        createdAt:true,
        paranoid:true,
        updatedAt:true,
    })
    Comment.belongsTo(User);
    User.hasMany(Comment,
        {
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        })

    Comment.belongsTo(Post);
    Post.hasMany(Comment,
        {
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        })

    
