import { Router } from "express"
import * as postService from "./post.service.js"
const router = Router()


router.post("/",postService.createPost)

router.delete("/:id",postService.deletePost)

router.get("/details",postService.getPostDetails)

router.get("/comment-count",postService.getCommentCount)



export default router