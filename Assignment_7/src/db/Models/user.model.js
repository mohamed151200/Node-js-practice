import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, ` name is required`],
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    }

})

const userModel = model('Users', userSchema)

export default userModel