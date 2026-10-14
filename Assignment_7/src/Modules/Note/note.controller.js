import { Router } from "express"

import * as notesService from "./note.service.js"

const router = Router()

router.get("/aggregate", notesService.aggregate1)

router.patch("/all", notesService.updateAllTitles)

router.get("/note-by-content", notesService.noteByContent)

router.get("/note-with-user", notesService.notesByUser)

router.post("/", notesService.createSingleNote)

router.patch("/:_id", notesService.updateSingleNote)

router.put("/replace/:note_id", notesService.replaceNote)

router.delete("/", notesService.deleteAllNotes)

router.delete("/:note_id", notesService.deleteNote)

router.get("/paginate-sort", notesService.getPaginated)

router.get("/:_id", notesService.getANote)

export default router