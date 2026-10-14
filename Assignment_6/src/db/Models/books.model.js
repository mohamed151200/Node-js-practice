import { db } from "../connections.js"

export const booksCollection =await db.createCollection("books", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["title"],
            properties: {
                title: {
                    bsonType: "string"
                },
            }

        }
    }})
   export const createIndex= async()=>{
        await booksCollection.createIndex({ title: 1 });
    }

