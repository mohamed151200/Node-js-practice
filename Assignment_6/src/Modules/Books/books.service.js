import { booksCollection } from "../../db/Models/books.model.js"
export const createbook = async (req, res) => {
    try {
        const book = (await booksCollection).insertOne(req.body)
        return res.status(201).json({ massege: 'created' })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

export const creatMultiebooks = async (req, res) => {
    try {
        const books = await booksCollection.insertMany(req.body)
        return res.status(201).json({ massege: 'created' })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

export const updateBook = async (req, res) => {
    try {
        const { title } = req.params
        const update = req.body
        const updateDocument = {
            $set: update
        };
        const book = await booksCollection.updateOne({ title: title }, updateDocument)
        return res.status(200).json({ massege: 'updated' })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

export const getSingleBook = async (req, res) => {
    try {
        const { title } = req.query

        const book = await booksCollection.findOne({ title: title })
        return res.status(200).json({ massege: book })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}


export const getBooksByYear = async (req, res) => {
    const { from, to } = req.query;

    const fromYear = Number(from);

    const toYear = Number(to);

    const books = await booksCollection
        .find({
            year: {
                $gte: fromYear,
                $lte: toYear
            }
        })
        .toArray();
    console.log(`==============${fromYear}`);


    res.json(books);
};

export const getBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query

        const books = await booksCollection.find({ genre: genre }).toArray()
        return res.status(200).json({ massege: books })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}



export const skip_limit = async (req, res) => {
    try {
        const books = await booksCollection.find({}).skip(2).limit(3).sort({ year: -1 }).toArray()
        return res.status(200).json({ massege: books })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

export const year_integer = async (req, res) => {


    const books = await booksCollection
        .find({
            year: {
                $type: "int"
            }
        })
        .toArray();


    res.json(books);
};

export const exclude_genres = async (req, res) => {
    try {

        const books = await booksCollection.find({
            genre: {
                $nin: ["fantasy", "sci-fi"]
            }
        }).toArray()
        return res.status(200).json({ messege: books })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

export const delete_before_year = async (req, res) => {
    try {
        const { year } = req.query



        const book = await booksCollection.deleteMany({
            year: {
                $lt: Number(year)
            }
        })
        return res.status(200).json({ massege: book })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

export const aggregate1 = async (req, res) => {
    try {
        const books = await booksCollection.aggregate([
            { $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }
        ]).toArray()
        return res.status(200).json({ massege: books })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}


export const aggregate2 = async (req, res) => {
    try {
        const books = await booksCollection.aggregate([
            { 
                $match: { year: { $gt: 2000 } } }, {
                $project: {
                    _id:0,
                    title: 1,
                    author: 1,
                    year: 1
                }
            }
        ]).toArray()
        return res.status(200).json({ massege: books })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

export const aggregate3 = async (req, res) => {
    try {
        const books = await booksCollection.aggregate([
            { 
               $unwind : "$genre"
            },
            {
            $project :{
                title : 1,
                genre : 1,
                _id : 0
            } 
                
            }
        ]).toArray()
        return res.status(200).json({ massege: books })
    } catch (err) {
        console.log(`Error while creating ${err}`);

    }

}

