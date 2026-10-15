import { DataTypes } from "sequelize"
import { sequelize } from "../connections.js"
import { User } from "./user.model.js"

export const Post = sequelize.define(
    'Post',
    {
        id: {
           autoIncrement:true,
           unique:true,
           allowNull:false,
           primaryKey:true,
           type:DataTypes.INTEGER
        },
        title:{
            type:DataTypes.STRING(123),
            allowNull:false,
            validate:{
                notNull:true,
                len:[3,500000]
            },
        
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
    Post.belongsTo(User);
    User.hasMany(Post,
        {
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        })
