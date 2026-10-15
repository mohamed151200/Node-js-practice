import { Router } from "express"
import * as userService from "./user.service.js"
const router = Router()
router.post("/signup",userService.createUser)

router.get("/login",userService.logInUser)

router.patch("/update/:id",userService.createOrUpdateUser)

router.get("/by-email",userService.findByEmail)

router.get("/:id",userService.findByPk)




export default router