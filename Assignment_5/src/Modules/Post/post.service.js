import { Post } from "../../db/Models/post.model.js"

import { User } from "../../db/Models/user.model.js"


import { Comment } from "../../db/Models/comment.model.js"
import { Sequelize } from "sequelize"



export const createPost = async (req, res) => {
    try {
        const {
            title,
            content,
            UserId
        } = req.body

        const user = await User.findByPk(UserId)

        if (!user) return res.status(404)


        const post = new Post({
            title,
            content,
            UserId
        })

        await post.save()

        return res.status(201).json({
            message: "post created successfully",
        })

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {

        const { id } = req.params

        const { email } = req.body

        const userPK = await User.findOne({
            where: { email }, attributes: ["id"]
        })



        const userFK = await Post.findOne({
            where: { id }, attributes: ["UserId"]
        })

        if (userPK.id !== userFK.UserId) return res.status(403).json(`you are not authorized`)

        // Delete everyone named "Jane"
        await Post.destroy({
            where: {
                id: id,
            },
        });

        return res.status(200).json({
            message: "Post deleted successfully",

        })

    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const getPostDetails = async (req, res) => {
    try {


        const posts = await Post.findAll({
            attributes: ["id", "title"],
            include: [
                {
                    model: User,
                    attributes: ["firstName"],
                }, {
                    model: Comment,
                    attributes: ["content"]
                }
            ]
        })


        return res.status(200).json({

            posts
        })




    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const getCommentCount = async (req, res) => {
    try {


        const posts = await Post.findAll({
            attributes: ["id", "title", [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "comments count"],],
            include:
            {
                model: Comment,
                attributes: []
            }, group: ["posts.id"]

        })


        return res.status(200).json({

            posts
        })




    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}
