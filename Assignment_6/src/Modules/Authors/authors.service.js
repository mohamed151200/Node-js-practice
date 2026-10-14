import { db  } from "../../db/connections.js";
export const createAuthor = async(req,res) => {
    try{
        const author = await db.collection("authors").insertOne(req.body)
        return res.status(201).json ({massege:'created'})
    }catch(err){
console.log(`Error while creating ${err}`);

    }

}