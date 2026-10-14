import { Router } from "express"
import * as booksService from "./books.service.js"
const router = Router()




 router.post("/",booksService.createbook)

router.post("/multi",booksService.creatMultiebooks)

router.patch("/:title",booksService.updateBook)

router.get("/title",booksService.getSingleBook)

router.get("/year",booksService.getBooksByYear)

router.get("/genre",booksService.getBooksByGenre)

router.get("/skip_limit",booksService.skip_limit)

router.get("/year_integer",booksService.year_integer)

router.get("/exclude_genres",booksService.exclude_genres)

router.delete("/before_year",booksService.delete_before_year)

router.get("/aggregate1",booksService.aggregate1)

router.get("/aggregate2",booksService.aggregate2)

router.get("/aggregate3",booksService.aggregate3)
















// router.patch("/update/:id",userService.createOrUpdateUser)

// router.get("/by-email",userService.findByEmail)

// router.get("/:id",userService.findByPk)




export default router