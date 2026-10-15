import { Router } from "express"
import * as commentService from "./comment.service.js"
const router = Router()


router.post("/",commentService.createBulkComments)

router.patch("/:id",commentService.updateComment)

router.get("/find-or-create",commentService.findOrCreate)

router.get("/find-and-count",commentService.findAndCount)

router.get("/newestComments/:PostId", commentService.newestComments)

router.get("/commentDetails/:CommentId", commentService.commentDetails)






export default router