import { Post } from "../../db/Models/post.model.js"

import { User } from "../../db/Models/user.model.js"


import { Comment } from "../../db/Models/comment.model.js"


import { Sequelize } from "sequelize"

import { Op } from "sequelize"



export const createBulkComments = async (req, res) => {
    try {
        const { comments } = req.body

        await Comment.bulkCreate(
            comments
        )


        return res.status(201).json({
            message: "comments created successfully",
        })

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const updateComment = async (req, res) => {
    try {
        const { id } = req.params

        const
            {
                content,
                UserId,

            } = req.body

        const comment = await Comment.findByPk(id)

        if (!comment) {
            return res.status(404).json({
                message: "comment not found",
            })
        }

        if (comment.UserId !== UserId) {
            return res.status(403).json({
                message: "Your are not the comment owner",
            })
        }

        await comment.update({
            content,
        })



        return res.status(200).json({
            message: "comment update successfully",

        })




    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}



export const findOrCreate = async (req, res) => {
    try {
        const { content, UserId, PostId } = req.body

        const [comment, created] = await Comment.findOrCreate({
            where: {
                UserId: UserId,
                PostId: PostId,
                content: content
            },

        })
        return res.status(200).json({
            comment, created,

        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const findAndCount = async (req, res) => {
    try {
        const { word } = req.query

        const comments = await Comment.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`
                }
            },

        })
        return res.status(200).json({
            comments

        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const newestComments = async (req, res) => {
    try {

        const { PostId } = req.params

        const comments = await Comment.findAll({
            order: [["updatedAt", "DESC"]],
            where: {
                PostId: PostId
            }
        });

        return res.status(200).json({
            comments

        })

    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const commentDetails = async (req, res) => {
    try {

        const { CommentId } = req.params
        
        const comment = await Comment.findOne({ 
            where: {
                id: CommentId
            },
            attributes: ["id", "content"],
            include: [
                {
                    model: User,
                    attributes: ["id", "firstName", "email"],
                }, {
                    model: Post,
                    attributes: ["id", "title", "content"]
                }
            ]
        })


        return res.status(200).json({

            comment
        })



    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}

