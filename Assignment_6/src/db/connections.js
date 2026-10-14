

import {MongoClient} from "mongodb"

const client =new MongoClient("mongodb://localhost:27017")

export const db = client.db("Blog_App")

export const connectDB= async()=>{
    try{
        await client.connect()
        console.log(`connected to mongo db successfully`);
        
    }catch(err){    
        console.log(err);
        
    }    
}




