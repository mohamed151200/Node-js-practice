import { User } from "../../db/Models/user.model.js"


export const createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmpassword,
            DOB,
            gender
        } = req.body

        if (!confirmpassword) return res.status(500).json({ massage: `type the password again ` })
        const isEmailAlreadyExists = await User.findOne({ where: { email } })
        if (isEmailAlreadyExists) return res.status(500).json({ massage: `email is already exist` })
        const user = User.build({
            firstName,
            lastName,
            email,
            password,
            confirmpassword,
            DOB,
            gender
        })

        await user.save()

        return res.status(201).json({
            message: "User created successfully",
            user
        })

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}

export const logInUser = async (req, res) => {
    try {
        const {

            email,
            password

        } = req.body

        const user = await User.findOne({
            where:
            {
                email,
                password
            }



        })

        return res.status(200).json({
            message: "User logged in successfully",
            user
        })

    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const createOrUpdateUser = async (req, res) => {
    try {
        const { id } = req.params

        const
            {
                firstName,
                lastName,
                email,
                password,
                confirmpassword,
                DOB,
                gender
            } = req.body
        const user = await User.findByPk(id)

        if (!user) {
            User.create({
                firstName,
                lastName,
                email,
                password,
                confirmpassword,
                DOB,
                gender
            })
        } else {


            await user.update({
                firstName,
                lastName,
                email,
                password,
                confirmpassword,
                DOB,
                gender
            })

            return res.status(200).json({
                message: "User updated or created successfully",
                user
            })
        }



    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const findByPk = async (req, res) => {
    try {
        const {id} =  req.params
        
        const user = await User.findByPk(id,{attributes:["firstName","email","createdAt","updatedAt"]})

        if (!user) return res.status(404).json({
            message: "user not found",
            error: err.message
        })
        return res.status(200).json({
            message: "user has found",
            user
        })
            
            
    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}


export const findByEmail = async (req, res) => {
    try {

        const {email} =  req.body
        const user = await User.findOne({where: {email}})

        if (!user) return res.status(404).json({
            message: "user not found",
            error: err.message
        })
        return res.status(200).json({
            message: "user has found",
            user
        })
            
            
    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}

