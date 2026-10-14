 import { connectDB } from "./db/connections.js"
 import { booksRouter, logsRouter } from "./Modules/index.js"
 import { authorsRouter } from "./Modules/index.js"

// import { postRouter} from "./Modules/index.js"
// import { commentRouter } from "./Modules/index.js"

// import {User} from '../src/db/Models/user.model.js'
// import {Post} from './db/Models/post.model.js'
import {createIndex , booksCollection} from'./db/Models/books.model.js'
import logsCollection from './db/Models/logs.model.js'




export const bootStrap = async (app, express) => {

    app.use(express.json())

    app.use("/collection/books",booksRouter)

    app.use("/collection/authors",authorsRouter)

    app.use("/logs",logsRouter)



    

    await connectDB()

    await createIndex()

    


   
}