 import  {connectDB}  from "./db/connections.js"
 import { notesRouter, usersRouter } from "./Modules/index.js"

// import { postRouter} from "./Modules/index.js"
// import { commentRouter } from "./Modules/index.js"

// import {User} from '../src/db/Models/user.model.js'
 import userModel from './db/Models/user.model.js'
import noteModel from './db/Models/note.model.js'





export const bootStrap = async (app, express) => {

    app.use(express.json())
    await connectDB()


app.use("/users",usersRouter)

app.use("/notes",notesRouter)



    



    
}