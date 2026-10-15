import { connectDB ,syncTabels} from "./db/connections.js"
import { userRouter } from "./Modules/index.js"
import { postRouter} from "./Modules/index.js"
import { commentRouter } from "./Modules/index.js"

import {User} from '../src/db/Models/user.model.js'
import {Post} from './db/Models/post.model.js'
import {Comment} from './db/Models/comment.model.js'


export const bootStrap = async (app, express) => {

    app.use(express.json())

    app.use("/api/v1/User", userRouter)

    app.use("/api/v1/posts", postRouter)

    app.use("/api/v1/Comment", commentRouter)

    await connectDB()

    await syncTabels()




    // const user=new User({
       
    //     firstName:"mohamd",
    //     lastName:"KHALED",
    //     email:`${Date.now()}@gmail.com`,
    //     password:"jahgd",
    //     DOB: "2000"
    // }) 
    // user.save()
    // console.log(user.age);
    
}