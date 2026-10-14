import { NUMBER } from "sequelize";
import noteModel from "../../db/Models/note.model.js";
import userModel from "../../db/Models/user.model.js";


export const createSingleNote = async (req, res) => {
    try {
        await noteModel.create(req.body)
        return res.status(201).json({ message: `created` })
    } catch (err) {
        return res.status(500).json({ message: err })

    }
}


export const updateSingleNote = async (req, res) => {
    try {
        const { _id } = req.params

        console.log(`_id = ${_id}`);

        const { userId } = req.body

        const note = await noteModel.findOne({ _id: _id })

        if (note.userId.toString() !== userId)
            return res.status(403).json({ message: `you are not allowed to update` })
        if (!note)
            return res.status(404).json({ message: `note not found` })
        await noteModel.updateOne(
            { _id },
            { $set: req.body }
        );
        return res.status(201).json({ message: `updated` })
    } catch (err) {
        return res.status(500).json({ message: err })

    }
}


export const replaceNote = async (req, res) => {
    try {
        const { note_id } = req.params
        const { user_id } = req.query



        const note = await noteModel.findOne({ _id: note_id })

        if (!note)
            return res.status(404).json({ message: `note not found` })

        if (note.userId.toString() !== user_id)
            return res.status(403).json({ message: `you are not allowed to update` })
        await noteModel.replaceOne(
            { _id: note_id },
            req.body
        );
        return res.status(201).json({ message: `replaced` })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })



    }
}


export const updateAllTitles = async (req, res) => {
    try {


        const { userId } = req.query

        const notes = await noteModel.updateMany({
            userId: userId
        }, {
            $set: {
                title: "updated title"
            }
        })


        return res.status(200).json({
            message: `all notes have updated`,
            notes: notes
        })
    } catch (err) {
        console.log(`=======${err}`);

        return res.status(500).json({ message: err })

    }
}


export const deleteNote = async (req, res) => {
    try {
        const { note_id } = req.params
        const { user_id } = req.query



        const note = await noteModel.findOne({ _id: note_id })

        if (!note)
            return res.status(404).json({ message: `note not found` })

        if (note.userId.toString() !== user_id)
            return res.status(403).json({ message: `you are not allowed to delete` })
        await noteModel.deleteOne(
            { _id: note_id }
        );
        return res.status(200).json({ message: `deleted` })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })



    }
}


export const getPaginated = async (req, res) => {
    try {

        const { userId, page, limit } = req.query

        const _page = Number(page)

        const _limit = Number(limit)

        const _skip = (_page * _limit) - _limit

        console.log(`_limit = ${_limit}`);
        console.log(`_skip = ${_skip}`);
        console.log(`_page = ${_page}`);
        


        const [notes, total] = await noteModel.find(
            { userId },
            null,
            {
                skip: _skip,
                limit: _limit,
                sort: { createdAt: -1 }
            }
        );


        return res.status(200).json(notes)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })



    }
}


export const getANote = async (req, res) => {
    try {

        const { userId } = req.query
        const { _id } = req.params

        const note = await noteModel.findById(_id)

        if (!note)
            return res.status(404).json({ message: `note not found` })

        if (note.userId.toString() !== userId)
            return res.status(403).json({ message: `you are not allowed to update` })
        return res.status(200).json(note)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })



    }
}


export const noteByContent = async (req, res) => {
    try {

        const { userId , content} = req.query
        

        const note = await noteModel.findOne({content})

        if (!note)
            return res.status(404).json({ message: `note not found` })

        if (note.userId.toString() !== userId)
            return res.status(403).json({ message: ` not allowed ` })
        return res.status(200).json(note)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })



    }
}


export const notesByUser = async (req, res) => {
    try {

        const { userId } = req.query
        

        const notes = await noteModel
    .find({ userId })
    .select("title userId createdAt")
    .populate("userId", "email");

        if (!notes)  
            return res.status(404).json({ message: `notes r not found` })

        
        return res.status(200).json(notes)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })



    }
}


export const aggregate1 = async (req, res) => {
    try {

        const { userId , title} = req.query
        let notes = []
        if(!title){
             notes = await noteModel.find({userId})
             return res.status(200).json(notes)
        }else{
            const note = await noteModel.findOne({title})

        if (!note)
            return res.status(404).json({ message: `note not found` })

        if (note.userId.toString() !== userId)
            return res.status(403).json({ message: ` not allowed ` })
        return res.status(200).json(note)
        }
        
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })



    }
}


export const deleteAllNotes = async (req, res) => {
    try {


        const { userId } = req.query

         await noteModel.deleteMany({
            userId: userId
        })


        return res.status(200).json({
            message: `all notes have deleted`,
            
        })
    } catch (err) {
        return res.status(500).json({ message: err })

    }
}












