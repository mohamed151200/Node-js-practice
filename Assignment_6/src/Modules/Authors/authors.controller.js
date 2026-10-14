import { Router } from "express"
import * as authorsService from "./authors.service.js"
const router = Router()




 router.post("/",authorsService.createAuthor)

// router.patch("/update/:id",userService.createOrUpdateUser)

// router.get("/by-email",userService.findByEmail)

// router.get("/:id",userService.findByPk)




export default router