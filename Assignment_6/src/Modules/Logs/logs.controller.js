import { Router } from "express"
import * as logsService from "./logs.service.js"
const router = Router()




 router.post("/capped",logsService.createlog)

  router.post("/",logsService.createlog)

 router.get("/aggregate4",logsService.aggregate4)

// router.get("/by-email",userService.findByEmail)

// router.get("/:id",userService.findByPk)




export default router