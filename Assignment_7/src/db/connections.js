

import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        mongoose.connection.on("connected" , () =>{
            console.log(`connected to mongodb successfully`);
            
        })
        mongoose.connect("mongodb://localhost:27017/Sticky_Notes")

    }catch(err){
        console.log(`erroe in connecting to mongodb ${err}`);
        
    }
}




