import { db } from "../connections.js"

const logsCollection = await db.createCollection("logs", {
     capped:true,
     size:1000000
    })

export default logsCollection


// {
//   book_id: '6ac7e54123b6e2bacd06fa3b',
//   action: 'borrowed'
// }