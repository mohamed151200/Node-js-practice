import logsCollection from "../../db/Models/logs.model.js"
export const createlog = async (req, res) => {
    try {
        const log = (await logsCollection).insertOne(req.body)
        return res.status(201).json({ massege: 'created' })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}


export const aggregate4 = async (req, res) => {
    try {
        const details = await logsCollection.aggregate([
            {
                $lookup: {
                    from: "books",
                    localField: "book_id",
                    foreignField: "_id",
                    as: "book_details"

                }
            }
        ]).toArray()
        return res.status(200).json({ massege: details })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

