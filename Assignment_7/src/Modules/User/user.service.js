import userModel from "../../db/Models/user.model.js";

export const signup = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email: email })
        if (user)
            return res.status(500).json({ message: `email is already exist` })
        await userModel.create(req.body)
        return res.status(201).json({ message: `created` })
    } catch (err) {
        console.log(err);

    }
}

//___________________________________________________________________________


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (!user)
            return res.status(404).json({ message: `email has not found` })
        if (user.password !== password)
            return res.status(401).json({ message: `wrong password` })


        return res.status(200).json({ message: `logged in successfully` })
    } catch (err) {
        console.log(err);

    }
}

//___________________________________________________________________________

export const update = async (req, res) => {
    try {
        const { email } = req.body
        if (email)
            if (await userModel.findOne({ email: email }))
                return res.status(400).json({ message: `email is already exists` })
            else {
                await userModel.updateOne(
                { _id: req.params.id },
                { $set: req.body }
            )
                return res.status(200).json({ message: `updated succssefully` })
            }
        await userModel.updateOne(
                { _id: req.params.id },
                { $set: req.body }
            );  
            return res.status(200).json({ message: `updated succssefully` })  


        }catch(err){
            console.log(err);
            
        }
}


//___________________________________________________________________________


export const deleteUser = async (req, res) => {
    try {
        const {_id} = req.params        
        const user = await userModel.findByIdAndDelete(_id)
        if (!user)
            return res.status(404).json({ message: `user not found !!` })
        
        return res.status(200).json({ message: `deleted` })
    } catch (err) {
        return res.status(500).json({ message: `${err}` })

    }
}



export const getUser = async (req, res) => {
    try {
        const { _id } = req.params
        const user = await userModel.findById(_id)
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ message: `${err}` })

    }
}



