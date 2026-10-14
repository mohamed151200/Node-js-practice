import { model, Schema } from "mongoose"

const notesSchema = new Schema({
    title: {
        type: String,
        required: [true, ` title is required`],
    },
    content: {
        type: String,
        required: true
    },
     userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
},
    {
        timestamps: true
    })

const noteModel = model('Notes', notesSchema)

export default noteModel