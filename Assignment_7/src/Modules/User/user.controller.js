import { Router } from "express"
import * as usersService from "./user.service.js"
const router = Router()

router.post("/signup",usersService.signup)

router.get("/login",usersService.login)

router.patch("/:id",usersService.update)

router.delete("/:_id",usersService.deleteUser)

router.get("/:_id",usersService.getUser)


export default router